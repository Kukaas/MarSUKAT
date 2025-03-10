import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";

// Icons
import { Spin, notification } from "antd";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordFail,
  forgotPasswordStart,
  forgotPasswordSuccess,
} from "../redux/forgotPassword/forgotPassword";

// Libraries
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RequestResetPasswordSchema } from "@/schema/shema";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/lib/api";
import ToasterError from "@/lib/Toaster";
import CustomInput from "@/components/components/custom-components/CustomInput";
import LeftSideDescription from "@/components/components/custom-components/LeftSideDescription";

// Import framer-motion for animations
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const RequestResetPassword = () => {
  const dispatch = useDispatch();
  const { loading1 } = useSelector((state) => state.forgotPassword) || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(RequestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle send OTP
  const handleSendOTP = async (values) => {
    const generateRandomToken = (length) => {
      let result = "";
      while (result.length < length) {
        result += Math.random().toString(36).substring(2); // Concatenate random strings
      }
      return result.substring(0, length); // Truncate to the desired length
    };

    const generatedToken = generateRandomToken(50);

    if (!values.email) return toast.error("Email is required");

    try {
      setLoading(true);
      dispatch(forgotPasswordStart());
      const res = await axios.post(`${BASE_URL}/api/v1/auth/send-otp`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200) {
        setLoading(false);
        dispatch(forgotPasswordSuccess(values.email));
        notification.success({
          message: "Success",
          description: "An OTP has been sent to your email.",
          pauseOnHover: false,
          showProgress: true,
        });
        navigate(`/otp-verification/${generatedToken}`, {
          replace: true,
        });
        localStorage.setItem("token", res.data.token);
      } else {
        setLoading(false);
        toast.error("Email is not registered", {
          description: "Please enter a valid email",
        });
        dispatch(forgotPasswordFail());
      }
    } catch (error) {
      setLoading(false);
      ToasterError({
        description: "Please check your internet connection and try again.",
      });
      dispatch(forgotPasswordFail());
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading1 ? (
        <Spin spinning={loading1} />
      ) : (
        <div className="flex w-full max-w-5xl mx-auto gap-8 flex-col md:flex-row md:items-center">
          {/* left */}
          <div className="flex-1 hidden md:flex md:flex-col md:justify-center md:items-start">
            <div className="scale-125 transform origin-left">
              <LeftSideDescription
                black="Forgot your "
                gradient="password?"
                description="Enter your email to reset your password"
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
                  Forgot Password
                </CardTitle>
                <CardDescription className="text-sm">
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSendOTP)}
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
                        name="email"
                        label="Email"
                        placeholder="Enter your email address"
                      />
                      <Button
                        type="submit"
                        className="w-full h-11 rounded-lg"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Sending Reset Link</span>
                          </div>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <motion.div
              className="mt-6 text-center text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-muted-foreground">
                Remembered your password?{" "}
                <Link
                  to="/sign-in"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      )}
      <Toaster position="top-center" closeButton richColors />
    </motion.div>
  );
};

export default RequestResetPassword;
