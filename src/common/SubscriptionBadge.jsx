
import { BadgeCheck } from "lucide-react";

const SubscriptionBadge = ({ plan, size = 16 }) => {
  if (!plan || plan === "free") return null;

  const normalizedPlan = plan.toLowerCase();

  if (!["basic", "premium", "pro"].includes(normalizedPlan)) {
    return null;
  }

  return (
    <span
      title={`${normalizedPlan} member`}
      aria-label={`${normalizedPlan} member`}
      className="inline-flex shrink-0 items-center text-blue-400"
    >
      <BadgeCheck size={size} fill="currentColor" stroke="#0B0D10" />
    </span>
  );
};

export default SubscriptionBadge;
