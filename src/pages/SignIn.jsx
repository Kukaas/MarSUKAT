import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";

// icons
import { Loader2 } from "lucide-react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginFail, loginStart, loginSuccess } from "../redux/user/userSlice";

import axios from "axios";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/shema";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/lib/api";
import ToasterError from "@/lib/Toaster";
import CustomInput from "@/components/components/custom-components/CustomInput";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LeftSideDescription from "@/components/components/custom-components/LeftSideDescription";
import { motion } from "framer-motion";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      navigate("/dashboard?tab=home-admin");
    } else if (currentUser && currentUser.isAdmin === false) {
      navigate("/dashboard?tab=home");
    } else {
      navigate("/sign-in");
    }
  }, [currentUser, navigate]);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle login
  const handleLogin = async (values) => {
    if (!values.email || !values.password) {
      toast.error("Please fill all the fields", {
        description: "All fields are required",
      });
      return;
    }
    try {
      setLoading(true);
      dispatch(loginStart());
      const res = await axios.post(`${BASE_URL}/api/v1/auth/sign-in`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const data = res.data;

      if (res.status === 200) {
        setLoading(false);
        dispatch(loginSuccess(data));
        localStorage.setItem("token", data.token);
        if (data.isAdmin) {
          navigate("/dashboard?tab=home-admin");
        } else {
          navigate("/dashboard?tab=home");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        setLoading(false);
        toast.error("User not found", {
          description: "Please check your email and password",
        });
        dispatch(loginFail(error.response.message));
      } else if (error.response && error.response.status === 401) {
        setLoading(false);
        toast.error("Wrong email or password", {
          description: "Please check your email and password",
        });
        dispatch(loginFail(error.response.data.message));
      } else if (error.response && error.response.status === 403) {
        setLoading(false);
        toast.error("Email Not Verified: Please Verify Your Email Address", {
          description: "Please check your email to verify your account.",
        });
        dispatch(loginFail(error.response.data.message));
      } else {
        setLoading(false);
        dispatch(
          loginFail(
            error.message ||
              "The server took too long to respond. Please try again later."
          )
        );
        ToasterError({
          description: "Please check your internet connection and try again.",
        });
      }
    }
  };

  return (
    <motion.div
      className="min-h-[500px] mt-[50px] mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>MarSUKAT | Sign In</title>
        <meta name="description" content="" />
        <meta name="keywords" content="marsu sign in, MarSUKAT" />
      </Helmet>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <LeftSideDescription
          black="Welcome to "
          gradient="MarSUKAT"
          description="Sign in to get started"
        />
        {/* right */}
        <motion.div
          className="flex-1"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Sign in with your email and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleLogin)}
                  className="space-y-4"
                >
                  <CustomInput
                    form={form}
                    name="email"
                    label="Email"
                    placeholder="Enter your email..."
                  />
                  <div className="relative flex flex-col">
                    <CustomInput
                      form={form}
                      name="password"
                      label="Password"
                      placeholder="Enter your password..."
                      type="password"
                    />
                    <Link
                      to="/forgot-password"
                      className=" right-0 bottom-0 text-sm mt-3 text-blue-400 underline hover:text-blue-500"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-3 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <Loader2 className="mr-2 animate-spin" />
                        <span>Signing in</span>
                      </div>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div>
            <p className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-blue-400 underline hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
      <Toaster position="top-center" closeButton richColors />
    </motion.div>
  );
};

export default SignIn;
