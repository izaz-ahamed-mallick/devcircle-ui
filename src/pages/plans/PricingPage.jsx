
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import PaymentConfirmation from "../../components/subscription/PaymentConfirmation";
import PaymentResultModal from "../../components/subscription/PaymentResultModal";
import PricingPlans from "../../components/subscription/PricingPlans";

import {
  loadRazorpayScript,
  openRazorpayCheckout,
} from "../../utils/razorpay";

import { PLANS } from "../../utils/Plans";

import {
  useCreateOrder,
  usePaymentStatus,
} from "../../hooks/usePaymentOrder";

import { useCurrentUser } from "../../hooks/useCurrentUser";

const TERMINAL_PAYMENT_STATUSES = ["paid", "failed"];

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isStartingCheckout, setIsStartingCheckout] = useState(false);

  const checkoutLock = useRef(false);
  const hasRefreshedProfile = useRef(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Current logged-in user's profile.
  const {
    data: profileData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useCurrentUser();

  // Support either { user: {...} } or direct user object.
  const user = profileData?.user ?? profileData;

  const currentPlan = user?.currentPlan;
  const hasActivePlan = user?.isUserHavePlan === true;
  const planExpiryDate = user?.planExpiryDate ?? null;

  // Payment order creation.
  const {
    mutateAsync: createOrder,
    isPending: isCreatingOrder,
  } = useCreateOrder();

  // Payment status polling.
  const {
    data: paymentStatus,
    isFetching: isCheckingPayment,
    isError: isPaymentStatusError,
    refetch: refetchPaymentStatus,
  } = usePaymentStatus(orderId);

  const currentPaymentStatus = paymentStatus?.payment?.status;

  const selectedPlanDetails = PLANS.find(
    (plan) => plan.id === selectedPlan
  );

  const isPaymentCompleted =
    Boolean(orderId) &&
    TERMINAL_PAYMENT_STATUSES.includes(currentPaymentStatus);
  const isLoading =
    isCreatingOrder ||
    isStartingCheckout ||
    isCheckingPayment;

  const isPaymentPending =
    Boolean(orderId) &&
    !isPaymentCompleted &&
    !isPaymentStatusError;

  // Refresh profile after webhook confirms successful payment.
  useEffect(() => {
    if (
      currentPaymentStatus !== "paid" ||
      hasRefreshedProfile.current
    ) {
      return;
    }

    hasRefreshedProfile.current = true;

    queryClient.invalidateQueries({
      queryKey: ["currentUser"],
    });
  }, [currentPaymentStatus, queryClient]);

  // Reset profile refresh guard when starting a new payment flow.
  useEffect(() => {
    if (!orderId) {
      hasRefreshedProfile.current = false;
    }
  }, [orderId]);

  // Select a subscription plan.
  const handleSelectPlan = useCallback((planId) => {
    if (isLoading || isUserLoading || checkoutLock.current) return;

    const planExists = PLANS.some(
      (plan) => plan.id === planId
    );

    if (!planExists) {
      toast.error("Invalid subscription plan.");
      return;
    }

    if (hasActivePlan && currentPlan === planId) {
      toast.info("You are already subscribed to this plan.");
      return;
    }

    setOrderId(null);
    setSelectedPlan(planId);
  }, [
    isLoading,
    isUserLoading,
    hasActivePlan,
    currentPlan,
  ]);

  // Create a new order and open Razorpay Checkout.
  const handleContinuePayment = useCallback(async (planId = selectedPlan) => {
    if (
      !planId ||
      checkoutLock.current ||
      isLoading
    ) {
      return;
    }


    const plan = PLANS.find(
      (item) => item.id === planId
    );

    if (!plan) {
      toast.error("Invalid subscription plan.");
      return;
    }

    if (hasActivePlan && currentPlan === planId) {
      toast.info("You are already subscribed to this plan.");
      return;
    }

    checkoutLock.current = true;
    setIsStartingCheckout(true);
    setOrderId(null);

    try {
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay. Please try again.");
      }

      const data = await createOrder(planId);

      const { order, keyId, user: checkoutUser } = data || {};

      if (!order?.id || !keyId || !checkoutUser) {
        throw new Error("Invalid payment order response.");
      }

      openRazorpayCheckout({
        order,
        keyId,
        user: checkoutUser,
        planName: plan.name,

        onSuccess: (paymentResponse) => {
          if (
            !paymentResponse?.razorpay_payment_id ||
            !paymentResponse?.razorpay_order_id ||
            paymentResponse.razorpay_order_id !== order.id
          ) {
            checkoutLock.current = false;

            toast.error(
              "Invalid payment response. Please contact support."
            );

            return;
          }

          // Checkout returned successfully. Now wait for webhook status.
          checkoutLock.current = false;
          setOrderId(order.id);

          toast.info(
            "Payment received. Confirming your membership..."
          );
        },

        onDismiss: () => {
          checkoutLock.current = false;

          toast.info(
            "Payment window closed. You can try again."
          );
        },
      });
    } catch (error) {
      console.error("Payment initialization error:", error);

      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Unable to start payment. Please try again."
      );

      checkoutLock.current = false;
    } finally {
      setIsStartingCheckout(false);
    }
  }, [
    selectedPlan,
    isLoading,
    createOrder,
    hasActivePlan,
    currentPlan,
  ]);

  // Retry payment with a fresh order.
  const handleRetryPayment = useCallback(() => {
    if (isLoading || checkoutLock.current) return;

    if (!selectedPlanDetails) {
      toast.error("Please select a subscription plan again.");
      return;
    }

    hasRefreshedProfile.current = false;

    handleContinuePayment(selectedPlan);
  }, [
    isLoading,
    selectedPlanDetails,
    selectedPlan,
    handleContinuePayment,
  ]);

  // Close confirmation modal.
  const handleCloseConfirmation = useCallback(() => {
    if (isLoading || checkoutLock.current) return;

    setSelectedPlan(null);
    setOrderId(null);
  }, [isLoading]);


  // Navigate home.
  const handleGoHome = useCallback(() => {
    setOrderId(null);
    setSelectedPlan(null);
    navigate("/");
  }, [navigate]);

  // Manually retry payment status request.
  const handleCheckPaymentAgain = useCallback(async () => {
    const result = await refetchPaymentStatus();

    if (result.isError) {
      toast.error("Unable to check payment status. Please try again.");
      return;
    }

    const status = result.data?.payment?.status;

    if (status === "paid") {
      toast.success("Your payment is confirmed!");
    } else if (status === "failed") {
      toast.error("Your payment was unsuccessful.");
    } else {
      toast.info("Payment is still being confirmed.");
    }
  }, [refetchPaymentStatus]);

  // Retry fetching profile if the initial request failed.
  const handleRetryProfile = useCallback(async () => {
    const result = await refetchUser();

    if (result.isError) {
      toast.error("Unable to fetch your profile.");
    }
  }, [refetchUser]);

  const isPricingVisible = !selectedPlan && !orderId;

  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-12 text-[#F0F2F5] sm:px-6 lg:px-8">

      {/* Pricing plans */}
      {isPricingVisible && (
        <div className="mx-auto max-w-7xl">
          <PricingPlans
            selectedPlan={selectedPlan}
            onSelectPlan={handleSelectPlan}
            isLoading={isLoading || isUserLoading}
            currentPlan={currentPlan}
            hasActivePlan={hasActivePlan}
            planExpiryDate={planExpiryDate}
          />

          {isUserError && (
            <div className="mt-4 text-center">
              <p className="text-sm text-[#8993A1]">
                Unable to load your current membership information.
              </p>

              <button
                type="button"
                onClick={handleRetryProfile}
                className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Retry profile
              </button>
            </div>
          )}
        </div>
      )}

      {/* Plan confirmation */}
      {selectedPlanDetails && !orderId && (
        <PaymentConfirmation
          plan={selectedPlanDetails}
          onClose={handleCloseConfirmation}
          onContinue={handleContinuePayment}
        />
      )}

      {/* Payment result */}
      {isPaymentCompleted && (
        <PaymentResultModal
          status={currentPaymentStatus}
          plan={selectedPlanDetails}
          paymentId={paymentStatus?.payment?.paymentId}
          onRetry={handleRetryPayment}
          onGoHome={handleGoHome}
          isLoading={isLoading}
        />
      )}

      {/* Payment pending */}
      {isPaymentPending && (
        <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[#292F39] bg-[#11151B] px-5 py-3 text-sm text-[#A7B7CD] shadow-xl">
          <span className="size-4 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />

          {isCheckingPayment
            ? "Confirming your payment..."
            : currentPaymentStatus === "created"
              ? "Payment is awaiting confirmation..."
              : "Waiting for payment confirmation..."}
        </div>
      )}

      {/* Payment status API error */}
      {orderId && isPaymentStatusError && !isPaymentCompleted && (
        <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-xl border border-red-500/20 bg-[#11151B] p-4 shadow-xl">
          <p className="text-sm font-semibold text-[#F0F2F5]">
            Unable to confirm payment
          </p>

          <p className="mt-1 text-xs leading-5 text-[#8993A1]">
            Your payment may still be processing. Please check again before attempting another payment.
          </p>

          <button
            type="button"
            onClick={handleCheckPaymentAgain}
            disabled={isCheckingPayment}
            className="mt-3 rounded-lg border border-[#292F39] bg-[#151A22] px-4 py-2 text-xs font-semibold text-[#A7B7CD] transition hover:border-blue-500/40 hover:text-white disabled:opacity-50"
          >
            {isCheckingPayment ? "Checking..." : "Check payment status"}
          </button>
        </div>
      )}
    </main>
  );
};

export default PricingPage;
