import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (currentUser && currentUser.isAdmin) {
      navigate("/dashboard?tab=home-admin");
    } else if (currentUser && currentUser.isAdmin === false) {
      navigate("/dashboard?tab=home");
    } else {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleClicked = () => {
    setLoading(true);

    setTimeout(() => {
      navigate("/sign-up");
      setLoading(false);
    }, 3000);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Helmet>
        <title>MarSUKAT | Get Started</title>
        <meta
          name="description"
          content="Welcome to MarSUKAT. We are glad to have you here. Login or Register to explore our features"
        />
        <meta name="keywords" content="marsu, MarSUKAT" />
      </Helmet>

      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link to="/" className="inline-block">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span
                className="px-2"
                style={{
                  background:
                    "linear-gradient(90deg, hsla(48, 80%, 66%, 1) 0%, hsla(0, 100%, 25%, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                MarSU
              </span>
              <span className="text-foreground">KAT</span>
            </h1>
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Welcome to MarSUKAT!
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            We're glad to have you here. Start exploring our features now.
          </p>

          <div className="flex flex-col gap-4 items-center">
            <motion.div
              className="w-full max-w-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full py-6 rounded-xl text-white text-lg font-semibold shadow-lg transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, hsla(48, 80%, 66%, 1) 0%, hsla(0, 100%, 25%, 1) 100%)",
                }}
                size="lg"
                onClick={handleClicked}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>Redirecting...</span>
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
