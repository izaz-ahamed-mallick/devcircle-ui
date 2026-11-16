
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Avoid loading the script multiple times.
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

export const openRazorpayCheckout = ({
  order,
  keyId,
  user,
  planName,
  onSuccess,
  onDismiss,
}) => {
  const options = {
    key: keyId,
    amount: order.amount,
    currency: order.currency,
    name: "DevCircle",
    description: `${planName} Membership`,
    order_id: order.id,

    prefill: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailId,
    },

    handler: (paymentResponse) => {
      onSuccess?.(paymentResponse);
    },

    theme: {
      color: "#3B82F6",
    },

    modal: {
      ondismiss: () => {
        onDismiss?.();
      },
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
