import { toast, Toaster } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// icon
import { message, notification } from "antd";
import { Loader2 } from "lucide-react";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordStart,
  forgotPasswordSuccess,
} from "../redux/forgotPassword/forgotPassword";

// Libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { OTPVerificationSchema } from "@/schema/shema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/api";
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

const OTPVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { currentEmail } = useSelector((state) => state.forgotPasword);

  // Redirect to forgot password page if email is not available
  useEffect(() => {
    if (!currentEmail) {
      navigate("/forgot-password");
    }
  }, [currentEmail, navigate]);

  const form = useForm({
    resolver: zodResolver(OTPVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Get the initial value of resendLoading and countdown from local storage
  useEffect(() => {
    const initialResendLoading =
      JSON.parse(localStorage.getItem("resendLoading")) || false;
    const initialCountdown =
      JSON.parse(localStorage.getItem("countdown")) || 60;
    setResendLoading(initialResendLoading);
    setCountdown(initialCountdown);
  }, []);

  // Save resendLoading and countdown to local storage
  useEffect(() => {
    localStorage.setItem("resendLoading", JSON.stringify(resendLoading));
    localStorage.setItem("countdown", JSON.stringify(countdown));
  }, [resendLoading, countdown]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let interval = null;
    if (resendLoading) {
      // Start countdown timer when resendLoading is true
      interval = setInterval(() => {
        setCountdown((seconds) => {
          if (seconds > 0) {
            return seconds - 1;
          } else {
            // Remove items from local storage when countdown reaches 0
            localStorage.removeItem("resendLoading");
            localStorage.removeItem("countdown");
            // Set resendLoading to false when countdown reaches 0
            setResendLoading(false);
            return 0;
          }
        });
      }, 1000);
    } else if (!resendLoading && countdown !== 60) {
      setCountdown(60);
    }
    return () => clearInterval(interval);
  }, [resendLoading, countdown]);

  // Resend OTP
  const resendOTP = async () => {
    if (!currentEmail) return navigate("/forgot-password");
    try {
      dispatch(forgotPasswordStart());
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/send-otp`,
        { email: currentEmail },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        notification.success({
          message: "Success",
          description: "An OTP has been sent to your email.",
          pauseOnHover: false,
          showProgress: true,
        });
        dispatch(forgotPasswordSuccess(currentEmail));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle resend OTP button click event and set resendLoading to true for 60 seconds
  const handleResendOTP = async () => {
    setResendLoading(true);
    await resendOTP();
    setTimeout(() => {
      setResendLoading(false);
    }, 60000);
  };

  // Handle OTP verification
  const handleSubmitOTP = async (values) => {
    const generateRandomToken = (length) => {
      let result = "";
      while (result.length < length) {
        result += Math.random().toString(36).substring(2); // Concatenate random strings
      }
      return result.substring(0, length); // Truncate to the desired length
    };

    const token = generateRandomToken(50);

    try {
      setLoading(true);
      if (!values.otp) {
        setLoading(false);
        return toast.error("OTP is required", {
          description: "Please enter the OTP sent to your email.",
        });
      }
      const res = await axios.post(
        "https://marsu.cut.server.kukaas.tech/api/v1/auth/verify-otp",
        { email: currentEmail, otp: values.otp },
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
        dispatch(forgotPasswordSuccess(currentEmail));
        message.success("OTP verified successfully");
        navigate(`/reset-password/${token}`, {
          replace: true,
        });
      } else {
        setLoading(false);
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
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
              black="Enter the "
              gradient="OTP"
              description="Enter the OTP sent to your email"
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
                OTP Verification
              </CardTitle>
              <CardDescription className="text-sm">
                Enter the 4-digit code sent to your email
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmitOTP)}
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
                      name="otp"
                      label="OTP Code"
                      placeholder="Enter 4-digit code"
                      maxLength={4}
                    />
                    <Button
                      type="submit"
                      className="w-full h-11 rounded-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Verifying OTP</span>
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              <motion.div
                className="mt-6 text-center text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-muted-foreground">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className={`font-semibold text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={handleResendOTP}
                    disabled={resendLoading && countdown > 0}
                  >
                    {resendLoading && countdown > 0
                      ? `Resend in ${countdown}s`
                      : "Resend OTP"}
                  </button>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Toaster position="top-center" closeButton richColors />
    </motion.div>
  );
};

export default OTPVerification;
