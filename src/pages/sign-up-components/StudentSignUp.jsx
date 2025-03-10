import CustomInput from "@/components/components/custom-components/CustomInput";
import SelectField from "@/components/components/custom-components/SelectField";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { BASE_URL } from "@/lib/api";
import ToasterError from "@/lib/Toaster";
import { StudentRegisterSchema } from "@/schema/shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { notification } from "antd";
import axios from "axios";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Student = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(StudentRegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      password: "",
      confirmPassword: "",
      studentNumber: "",
      studentGender: "",
      level: "",
    },
  });

  const selectedLevel = form.watch("level");

  const departmentOptions =
    selectedLevel === "COLLEGE"
      ? [
          "College of Agriculture(Torrijos Campus)",
          "College of Allied Health Sciences",
          "College of Arts and Social Sciences",
          "College of Business and Accountancy",
          "College of Criminal Justice Education",
          "College of Education",
          "College of Engineering",
          "College of Environmental Studies",
          "College of Fisheries and Aquatic Sciences(Gasan Campus)",
          "College of Governance",
          "College of Industrial Technology",
          "College of Information and Computing Sciences",
        ]
      : ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

  // Handle register
  const handleRegister = async (values) => {
    if (values.password && values.password.includes(" ")) {
      toast.error("Password cannot contain spaces");
      return;
    }

    if (values.password && values.password.length < 6) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match", {
        description:
          "Please make sure your password and confirm password match.",
      });
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/sign-up`,
        { ...values, role: "Student" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        navigate("/sign-in");
        notification.success({
          message: "Registration successful",
          description: "Please check your email for verification.",
          closable: true,
          duration: 5,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setLoading(false);
        toast.error("Email is already taken", {
          description: "Please try another email.",
        });
      } else if (error.response && error.response.status === 401) {
        setLoading(false);
        toast.error("Name already taken", {
          description: "Please try another name.",
        });
      } else {
        setLoading(false);
        ToasterError({
          description: "Please check your internet connection and try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Step navigation
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRegister)}
          className="space-y-6"
        >
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                  form={form}
                  name="name"
                  label="Name"
                  placeholder="eg. John Doe"
                  type="text"
                />
                <CustomInput
                  form={form}
                  name="studentNumber"
                  label="Student Number"
                  placeholder="eg. 21B10322"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentGender"
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Gender"
                      options={["Male", "Female"]}
                      placeholder="Select gender"
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <SelectField
                      field={field}
                      label="Level"
                      options={["COLLEGE", "HS"]}
                      placeholder="Select level"
                    />
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <SelectField
                    field={field}
                    label="Department"
                    options={departmentOptions}
                    placeholder="Select department"
                  />
                )}
              />

              <Button
                type="button"
                variant="default"
                className="w-full mt-6 rounded-lg h-11"
                onClick={nextStep}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <CustomInput
                form={form}
                name="email"
                label="Email"
                placeholder="Enter your email address"
              />
              <CustomInput
                form={form}
                name="password"
                label="Password"
                placeholder="Create a strong password"
                type="password"
              />
              <CustomInput
                form={form}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
              />

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 rounded-lg"
                  onClick={prevStep}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Creating Account</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Student;
