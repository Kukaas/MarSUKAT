import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { statusColors } from "@/lib/utils";
import CardLoading from "./CardLoading";
import { Calendar, CreditCard, User } from "lucide-react";

function OrderGrid({
  data,
  handleViewReceipts,
  handleDelete,
  currentUser,
  setSelectedOrder,
  setNewCurrentBalance,
  setOpenReceiptForm,
  loading,
  handleViewDetails,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <CardLoading />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {data.map((order) => {
        const hasOrderItems = order.orderItems && order.orderItems.length > 0;

        const totalPrice = hasOrderItems
          ? order.orderItems.reduce(
              (acc, item) => acc + parseFloat(item.totalPrice || 0),
              0
            )
          : 0;

        const receipts = order.receipts || [];
        const totalAmountPaid = receipts.reduce(
          (acc, receipt) => acc + parseFloat(receipt.amount || 0),
          0
        );

        const currentBalance = hasOrderItems
          ? totalPrice - totalAmountPaid
          : null;
        const { color, badgeText } =
          statusColors[order.status] || statusColors.default;

        return (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {order.studentName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.studentNumber}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white dark:bg-gray-800"
                >
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  {currentUser.role === "Student" && (
                    <DropdownMenuItem
                      onClick={() => {
                        if (currentBalance > 0 && order.status !== "APPROVED") {
                          setSelectedOrder(order);
                          setNewCurrentBalance(order);
                          setOpenReceiptForm(true);
                        }
                      }}
                      disabled={
                        currentBalance === 0 || order.status === "APPROVED"
                      }
                    >
                      Add New Receipt
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleViewReceipts(order._id)}
                  >
                    View Receipts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                    View Order Details
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDelete(order)}
                    disabled={[
                      "APPROVED",
                      "MEASURED",
                      "DONE",
                      "CLAIMED",
                    ].includes(order.status)}
                  >
                    <span className="text-red-400">Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Schedule
                  </p>
                  <p className="text-sm text-gray-900 dark:text-gray-100">
                    {order.schedule
                      ? new Date(order.schedule).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Not scheduled yet"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Total Price
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {hasOrderItems
                        ? `₱${totalPrice.toFixed(2)}`
                        : "Not yet measured"}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Current Balance
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {hasOrderItems
                        ? `₱${currentBalance.toFixed(2)}`
                        : "Not yet measured"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Status
                </span>
                <div
                  className="status-badge px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <div
                      className="size-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <p style={{ color }}>
                      {order.status === "DONE" ? "For Claiming" : badgeText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

OrderGrid.propTypes = {
  data: PropTypes.array.isRequired,
  handleViewReceipts: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  setSelectedOrder: PropTypes.func.isRequired,
  setNewCurrentBalance: PropTypes.func.isRequired,
  setOpenReceiptForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  handleViewDetails: PropTypes.func.isRequired,
};

export default OrderGrid;
