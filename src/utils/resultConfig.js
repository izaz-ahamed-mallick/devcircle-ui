
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";

export const RESULT_CONFIG = {
  paid: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/20",
    title: "Payment Successful!",
    description:
      "Your payment has been verified. Welcome to your upgraded DevCircle experience.",
    badge: "Payment verified",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
  },

  failed: {
    icon: XCircle,
    iconBg: "bg-red-500/10",
    iconColor: "text-red-400",
    border: "border-red-500/20",
    title: "Payment Failed",
    description:
      "We couldn't verify your payment. Don't worry, you can try again.",
    badge: "Payment unsuccessful",
    badgeColor: "text-red-400 bg-red-500/10",
  },

  cancelled: {
    icon: AlertCircle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
    title: "Payment Cancelled",
    description:
      "You closed the payment window before completing your transaction.",
    badge: "Payment cancelled",
    badgeColor: "text-amber-400 bg-amber-500/10",
  },
};
