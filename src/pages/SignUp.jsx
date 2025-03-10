// UI
import { Toaster } from "sonner";

// others
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CoordinatorSignUp from "./sign-up-components/CoordinatorSignUp";
import StudentSignUp from "./sign-up-components/StudentSignUp";
import CommercialSignUp from "./sign-up-components/CommercialSignUp";
import LeftSideDescription from "@/components/components/custom-components/LeftSideDescription";
import { motion } from "framer-motion";

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      navigate("/dashboard?tab=home-admin");
    } else if (currentUser && currentUser.isAdmin === false) {
      navigate("/dashboard?tab=home");
    } else {
      navigate("/sign-up");
    }
  }, [currentUser, navigate]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Helmet>
        <title>MarSUKAT | Sign Up</title>
        <meta name="description" content="" />
        <meta name="keywords" content="marsu sign up, MarSUKAT" />
      </Helmet>
      <div className="flex w-full max-w-5xl mx-auto gap-8 flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1 hidden md:flex md:flex-col md:justify-center md:items-start">
          <div className="scale-125 transform origin-left">
            <LeftSideDescription
              black="Welcome to "
              gradient="MarSUKAT"
              description="Sign up to get started"
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
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 rounded-2xl bg-muted/20 dark:bg-muted/10 p-1.5 backdrop-blur-sm">
              <TabsTrigger
                value="student"
                className="rounded-xl py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background dark:data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                Student
              </TabsTrigger>
              <TabsTrigger
                value="coordinator"
                className="rounded-xl py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background dark:data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                Coordinator
              </TabsTrigger>
              <TabsTrigger
                value="commercial"
                className="rounded-xl py-2.5 text-sm font-medium transition-all data-[state=active]:bg-background dark:data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-md"
              >
                Commercial
              </TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="student">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-card dark:bg-card/95">
                  <CardHeader className="space-y-1 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/10 dark:to-muted/5 pb-8">
                    <CardTitle className="text-2xl font-bold">
                      Student Sign Up
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Create your student account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <StudentSignUp />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="coordinator">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-card dark:bg-card/95">
                  <CardHeader className="space-y-1 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/10 dark:to-muted/5 pb-8">
                    <CardTitle className="text-2xl font-bold">
                      Coordinator Sign Up
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Create your coordinator account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CoordinatorSignUp />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="commercial">
                <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-card dark:bg-card/95">
                  <CardHeader className="space-y-1 bg-gradient-to-r from-muted/50 to-muted/30 dark:from-muted/10 dark:to-muted/5 pb-8">
                    <CardTitle className="text-2xl font-bold">
                      Commercial Sign Up
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Create your commercial account to get started
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <CommercialSignUp />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>

          <motion.div
            className="mt-6 text-center text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-muted-foreground">
              Already have an account?{" "}
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
      <Toaster position="top-center" closeButton richColors />
    </motion.div>
  );
};

export default SignUp;
