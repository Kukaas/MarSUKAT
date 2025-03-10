import { Calendar, CreditCard, Loader2, User, Package2 } from "lucide-react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { statusColors } from "@/lib/utils";

const StatusBadge = ({ status }) => {
  const { color, badgeText } = statusColors[status] || statusColors.default;

  return (
    <div className="status-badge flex items-center gap-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <p className="text-xs font-semibold" style={{ color }}>
        {status === "DONE" ? "For Claiming" : badgeText}
      </p>
    </div>
  );
};

const OrderItems = ({ orderItems }) => {
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return <div className="text-gray-600">Not yet Measured</div>;
  }

  const groupedItems = orderItems.reduce((acc, item) => {
    const key = `${item.productType}-${item.size}-${item.level}`;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 0 };
    }
    acc[key].quantity += item.quantity;
    return acc;
  }, {});

  const itemsToRender = Object.values(groupedItems);

  return (
    <div className="grid grid-cols-1 gap-3">
      {itemsToRender.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white dark:bg-gray-600 rounded-md">
              <Package2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <div>
              {item.productType === "LOGO" || item.productType === "NECKTIE" ? (
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {item.productType}
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.productType}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.level}</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 bg-white dark:bg-gray-600 rounded-md">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                × {item.quantity}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

function OrderDetailsModal({ isOpen, onOpenChange, selectedOrder }) {
  if (!selectedOrder) return null;

  const hasOrderItems =
    selectedOrder.orderItems && selectedOrder.orderItems.length > 0;

  const totalPrice = hasOrderItems
    ? selectedOrder.orderItems.reduce(
        (acc, item) => acc + parseFloat(item.totalPrice || 0),
        0
      )
    : 0;

  const totalAmountPaid = selectedOrder.receipts.reduce(
    (acc, receipt) => acc + parseFloat(receipt.amount || 0),
    0
  );

  const currentBalance = hasOrderItems ? totalPrice - totalAmountPaid : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] md:max-w-[85%] lg:max-w-[65%] xl:max-w-[50%] max-h-[85vh] overflow-y-auto p-6 bg-white dark:bg-gray-900">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl text-gray-900 dark:text-gray-100">
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Personal Details Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedOrder.studentName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedOrder.studentNumber}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Year Level
                </p>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {selectedOrder.level}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Department
                </p>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {selectedOrder.department}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Order Information
              </h3>
            </div>

            <div className="space-y-6">
              {/* Schedule */}
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Schedule
                  </span>
                </div>
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {selectedOrder.schedule
                    ? new Date(selectedOrder.schedule).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )
                    : "Not scheduled yet"}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Ordered Items
                </h4>
                <OrderItems orderItems={selectedOrder.orderItems} />
              </div>

              {/* Payment Details */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Payment Details
                </h4>
                <div className="bg-white dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Total Price
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {hasOrderItems
                        ? `₱${totalPrice.toFixed(2)}`
                        : "Not yet measured"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Amount Paid
                    </span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      ₱{totalAmountPaid.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Current Balance
                    </span>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {hasOrderItems
                        ? `₱${currentBalance.toFixed(2)}`
                        : "Not yet measured"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-700/50 rounded-lg">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

OrderDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object,
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

OrderItems.propTypes = {
  orderItems: PropTypes.array.isRequired,
};

export default OrderDetailsModal;
