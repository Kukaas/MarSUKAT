// UI
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { notification } from "antd";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// icons
import { Loader2 } from "lucide-react";

// redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  forgotPasswordFail,
  forgotPasswordSuccess,
} from "../redux/forgotPassword/forgotPassword";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schema/shema";
import { BASE_URL } from "@/lib/api";
import CustomInput from "@/components/components/custom-components/CustomInput";
import LeftSideDescription from "@/components/components/custom-components/LeftSideDescription";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentEmail } = useSelector((state) => state.forgotPasword);

  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect to forgot password page if email is not available
  useEffect(() => {
    if (!currentEmail) {
      navigate("/forgot-password");
    }
  }, [currentEmail, navigate]);

  // Handle reset password
  const handleResetPassword = async (values) => {
    if (!currentEmail) return navigate("/forgot-password");

    if (!values.password || !values.confirmPassword)
      return toast.error("Please fill in all fields");

    if (values.password !== values.confirmPassword)
      return toast.error("Passwords do not match", {
        description: "Please check your password",
      });

    if (values.password.length < 8)
      return toast.error("Password must be at least 8 characters long");

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/reset-password`,
        { email: currentEmail, ...values },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setLoading(false);
        notification.success({
          message: "Success",
          description: "Password reset successful. You can now sign in.",
          pauseOnHover: false,
          showProgress: true,
        });
        dispatch(forgotPasswordFail());
        navigate("/sign-in");
        localStorage.removeItem("token");
      } else {
        setLoading(false);
        toast.error(res.data.message);
        dispatch(forgotPasswordSuccess(currentEmail));
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      dispatch(forgotPasswordSuccess(currentEmail));
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full max-w-5xl mx-auto gap-8 flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1 hidden md:flex md:flex-col md:justify-center md:items-start">
          <div className="scale-125 transform origin-left">
            <LeftSideDescription
              black="Reset "
              gradient="Password"
              description="Reset your password"
            />
          </div>
        </div>

        {/* right */}
        <motion.div
          className="flex-1 w-full max-w-md"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-card dark:bg-card/95">
            <CardHeader className="space-y-1 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/10 dark:to-muted/5 pb-8">
              <CardTitle className="text-2xl font-bold">
                Reset Password
              </CardTitle>
              <CardDescription className="text-sm">
                Enter your new password below
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleResetPassword)}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <CustomInput
                      form={form}
                      name="password"
                      label="New Password"
                      placeholder="Enter your new password"
                      type="password"
                    />
                    <CustomInput
                      form={form}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="Confirm your new password"
                      type="password"
                    />
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Resetting Password</span>
                        </div>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Toaster position="top-center" closeButton richColors />
    </motion.div>
  );
};

export default ResetPassword;
