// UI
import { Layout } from "antd";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const ResponsiveFooter = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <Footer className="bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900 text-foreground py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Logo Section */}
        <motion.div
          className="flex justify-center md:justify-start mb-8"
          {...fadeInUp}
        >
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold">
              <span
                style={{
                  background:
                    "linear-gradient(90deg, hsla(48, 80%, 66%, 1) 0%, hsla(0, 100%, 25%, 1) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                MarSU
              </span>
              <span>KAT</span>
            </span>
          </Link>
        </motion.div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <motion.div {...fadeInUp}>
            <h3 className="text-base font-semibold mb-3">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We are dedicated to providing high-quality garments and excellent
              service to our customers. Your satisfaction is our priority.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div {...fadeInUp}>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <div className="space-y-2">
              <a
                href="https://maps.app.goo.gl/v2Xs3dUa335hUNRc7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <MapPin className="h-3.5 w-3.5 text-green-500" />
                <span>Tanza, Boac, Marinduque, Philippines</span>
                <ExternalLink className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="tel:+6390382322343"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-blue-500" />
                <span>+63 9038 232 2343</span>
              </a>

              <a
                href="mailto:msc.garments@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-red-500" />
                <span>msc.garments@gmail.com</span>
              </a>
            </div>
          </motion.div>

          {/* Business Hours Section */}
          <motion.div {...fadeInUp}>
            <h3 className="text-base font-semibold mb-3">Business Hours</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Clock className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Monday - Thursday</p>
                  <p>7:30 AM - 11:30 AM (Measurements)</p>
                  <p>12:30 PM - 4:30 PM (Claiming)</p>
                  <p className="mt-1">Friday: No Transactions</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Section */}
          <motion.div {...fadeInUp}>
            <h3 className="text-base font-semibold mb-3">Connect With Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
              </a>
              <a
                href="#"
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-4 w-4 text-pink-500" />
              </a>
              <a
                href="#"
                className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          className="border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>
            &copy; {new Date().getFullYear()} MarSUKAT. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </Footer>
  );
};

export default ResponsiveFooter;
