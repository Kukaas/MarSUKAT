import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateOrder from "@/components/components/forms/CreateOrder";
import { Toaster } from "sonner";
import Blouse from "../../../../../assets/blouse.png";
import Skirt from "../../../../../assets/skirt.png";
import SetFemale from "../../../../../assets/1SetFemale.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const addNewOrder = () => {
    setIsDialogOpen(false);
    navigate("/dashboard?tab=orders");
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to MarSUKAT Uniform Services
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Order your school uniforms easily through our streamlined process
          </p>
        </div>

        {/* Steps to Order Card - Modernized */}
        <Card className="border-none shadow-xl rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent dark:from-primary/80 dark:to-primary/60">
              How to Order Your Uniform
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Visit Garments",
                  details: "Request a Downpayment Form for your uniform",
                  icon: "📋",
                },
                {
                  step: "02",
                  title: "Make Payment",
                  details: "Pay ₱500 at the cashier and secure your receipt",
                  icon: "💳",
                },
                {
                  step: "03",
                  title: "Book Appointment",
                  details: "Create an appointment through our system",
                  icon: "📅",
                },
                {
                  step: "04",
                  title: "Fill Details",
                  details: "Enter your receipt information in the form",
                  icon: "✍️",
                },
                {
                  step: "05",
                  title: "Submit",
                  details: "Wait for admin approval of your appointment",
                  icon: "✅",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gray-50/80 dark:bg-gray-800 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="text-sm text-primary dark:text-primary/80 font-semibold mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center w-full pt-6">
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full md:w-auto px-8 py-2.5 rounded-full 
                      "
                  >
                    Create Appointment
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="sm:max-w-[450px] max-h-[550px] overflow-auto">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Create an Appointment</AlertDialogTitle>
                    <AlertDialogDescription>
                      Fill in the form below to create a new order.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <CreateOrder
                    addNewOrder={addNewOrder}
                    setIsDialogOpen={setIsDialogOpen}
                  />
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        {/* Product Previews - Modern Grid */}
        <Card className="border-none shadow-xl rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent dark:from-primary/80 dark:to-primary/60">
              Uniform Previews
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Premium quality uniforms for our students
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { src: `${Skirt}`, label: "Skirt" },
                { src: `${Blouse}`, label: "Blouse" },
                { src: `${SetFemale}`, label: "Uniform Set (Female)" },
              ].map((product, idx) => (
                <div
                  key={idx}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={product.src}
                    alt={`${product.label} preview`}
                    className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-white font-medium">
                      {product.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster position="top-center" richColors closeButton />
    </main>
  );
};

export default Dashboard;
