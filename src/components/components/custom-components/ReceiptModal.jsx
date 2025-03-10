import {
  Calendar,
  CreditCard,
  Loader2,
  User,
  X,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/lib/api";
import { token } from "@/lib/token";

function ReceiptModal({
  isOpen,
  onOpenChange,
  receipts,
  loading,
  orderId,
  onVerifyReceipt,
}) {
  const { currentUser } = useSelector((state) => state.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleVerifyAndApprove = async (receipt) => {
    try {
      setVerifying(true);

      // Verify receipt
      const verifyRes = await axios.put(
        `${BASE_URL}/api/v1/order/student/receipt/verify/${orderId}/${receipt._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (verifyRes.status === 200) {
        // Call the callback to update UI
        onVerifyReceipt(receipt, true);
        toast.success("Receipt verified and order approved successfully!");
      }
    } catch (error) {
      console.error("Error verifying receipt:", error);
      toast.error("Failed to verify receipt");
    } finally {
      setVerifying(false);
      setDialogOpen(false);
    }
  };

  const handleVerify = async (receipt) => {
    try {
      setVerifying(true);

      const res = await axios.put(
        `${BASE_URL}/api/v1/order/student/receipt/verify/${orderId}/${receipt._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        // Call the callback to update UI
        onVerifyReceipt(receipt, false);
        toast.success("Receipt verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying receipt:", error);
      toast.error("Failed to verify receipt");
    } finally {
      setVerifying(false);
      setDialogOpen(false);
    }
  };

  if (!receipts) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] md:max-w-[85%] lg:max-w-[65%] xl:max-w-[50%] max-h-[85vh] overflow-y-auto p-0 bg-white dark:bg-gray-900">
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between px-6 py-4">
            <DialogHeader className="p-0 m-0">
              <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Receipts
              </DialogTitle>
            </DialogHeader>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>

        <div className="p-6 pt-4">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {receipts.map((receipt, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6 space-y-6">
                    {/* Receipt Header - Fixed Height */}
                    <div className="min-h-[72px] flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg shrink-0">
                          <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                        </div>
                        <div className="min-w-0 flex-1">
                          {" "}
                          {/* Add min-w-0 to enable text truncation */}
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {receipt.type}
                          </p>
                          <p className="text-xs text-gray-500 break-all">
                            OR Number: {receipt.ORNumber}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4 shrink-0">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          ₱{receipt.amount.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(receipt.datePaid).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Receipt Image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                      <img
                        src={receipt.url}
                        alt={`Receipt ${index + 1}`}
                        className="object-cover w-full h-full transition-transform hover:scale-105"
                      />
                    </div>

                    {/* Verification Status */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Status:
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            receipt.isVerified
                              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 ring-1 ring-green-600/20"
                              : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 ring-1 ring-yellow-600/20"
                          }`}
                        >
                          {receipt.isVerified ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Verified
                            </>
                          ) : (
                            "Pending"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Admin Verification Buttons */}
                    <div className="flex items-center justify-end gap-2">
                      {currentUser?.isAdmin &&
                        receipt.type === "Down Payment" &&
                        !receipt.isVerified && (
                          <AlertDialog
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  setSelectedReceipt(receipt);
                                  setDialogOpen(true);
                                }}
                                disabled={verifying}
                              >
                                {verifying ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  "Verify & Approve"
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Receipt Verification
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to verify this receipt?
                                  Once verified, the order status will be
                                  updated to <strong>APPROVED</strong>. This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                  onClick={() =>
                                    handleVerifyAndApprove(selectedReceipt)
                                  }
                                  disabled={verifying}
                                >
                                  {verifying ? (
                                    <div className="flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Verifying
                                    </div>
                                  ) : (
                                    "Verify Receipt"
                                  )}
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}

                      {currentUser?.isAdmin &&
                        receipt.type === "Full Payment" &&
                        !receipt.isVerified && (
                          <AlertDialog
                            open={dialogOpen}
                            onOpenChange={setDialogOpen}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  setSelectedReceipt(receipt);
                                  setDialogOpen(true);
                                }}
                                disabled={verifying}
                              >
                                {verifying ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  "Verify Receipt"
                                )}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Confirm Receipt Verification
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to verify this receipt?
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                  onClick={() => handleVerify(selectedReceipt)}
                                  disabled={verifying}
                                >
                                  {verifying ? (
                                    <div className="flex items-center gap-2">
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                      Verifying
                                    </div>
                                  ) : (
                                    "Verify Receipt"
                                  )}
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}

                      {/* View Full Receipt Button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={receipt.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </a>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Full Receipt</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

ReceiptModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  receipts: PropTypes.array,
  loading: PropTypes.bool,
  orderId: PropTypes.string,
  onVerifyReceipt: PropTypes.func.isRequired,
};

export default ReceiptModal;
