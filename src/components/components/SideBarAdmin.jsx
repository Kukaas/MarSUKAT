import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Home,
  ShoppingCart,
  Users,
  Badge,
  Calendar,
  Package,
  Clipboard,
  Building,
  Store,
  Package2Icon,
  PackageOpen,
  Shirt,
  LineChart,
  PieChart,
  BarChart,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useSelector } from "react-redux";

const SideBarAdmin = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const { currentUser } = useSelector((state) => state.user);

  const isActive = (path) => currentPath === path;

  return (
    <div className="flex h-[800px] flex-col gap-2 w-[250px] border-r-2 light:mt-2">
      <div className="flex h-full max-h-screen flex-col gap-5">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">
              {" "}
              {currentUser?.name?.split(" ")[0]} |
            </span>
            <span className="text-gray-300">
              {currentUser.isAdmin ? "Admin" : "User"}
            </span>
          </div>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-3 text-sm font-medium lg:px-4 gap-2">
            <Link
              to="/dashboard?tab=home-admin"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/dashboard?tab=home-admin")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/dashboard?tab=productions"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/dashboard?tab=productions")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Package className="h-4 w-4" />
              Productions
            </Link>
            {/* Transactions */}
            <Accordion type="single" collapsible className="w-full rounded-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={`flex items-center justify-between px-3 py-2 text-left transition-all ${
                    isActive("item-1")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Transactions
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/dashboard?tab=orders-admin"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=orders-admin")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Clipboard className="h-4 w-4" />
                      Orders
                    </Link>
                    <Link
                      to="/dashboard?tab=rentals-admin"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=rentals-admin")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Badge className="h-4 w-4" />
                      Rentals
                    </Link>
                    <Link
                      to="/dashboard?tab=commercial-job-admin"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=commercial-job-admin")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Building className="h-4 w-4" />
                      Commercial Job
                    </Link>
                    <hr></hr>
                    <Link
                      to="/dashboard?tab=schedules"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=schedules")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Calendar className="h-4 w-4" />
                      Schedules
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Inventory */}
            <Accordion type="single" collapsible className="w-full rounded-lg">
              <AccordionItem value="item-2">
                <AccordionTrigger
                  className={`flex items-center justify-between px-3 py-2 text-left transition-all ${
                    isActive("item-2")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Inventory
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/dashboard?tab=raw-materials"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=raw-materials")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Package2Icon className="h-4 w-4" />
                      Raw Materials
                    </Link>
                    <Link
                      to="/dashboard?tab=finished-products"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=finished-products")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <PackageOpen className="h-4 w-4" />
                      Finished Product
                    </Link>
                    <Link
                      to="/dashboard?tab=academic-inventory"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=academic-inventory")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Shirt className="h-4 w-4" />
                      Accademics
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Sales */}
            <Accordion type="single" collapsible className="w-full rounded-lg">
              <AccordionItem value="item-3">
                <AccordionTrigger
                  className={`flex items-center justify-between px-3 py-2 text-left transition-all ${
                    isActive("item-2")
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LineChart className="h-4 w-4" />
                    Reports
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  <div className="flex flex-col gap-1">
                    <Link
                      to="/dashboard?tab=accomplishment-report"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=accomplishment-report")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <PieChart className="h-4 w-4" />
                      Accomplishment Report
                    </Link>
                    <Link
                      to="/dashboard?tab=sales-report"
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive("/dashboard?tab=sales-report")
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <BarChart className="h-4 w-4" />
                      Sales Report
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              to="/dashboard?tab=all-users"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                isActive("/dashboard?tab=all-users")
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SideBarAdmin;