
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  X,
} from "lucide-react";

const PaymentConfirmation = ({
  plan,
  onClose,
  onContinue,
  isLoading = false,
}) => {
  if (!plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-[#292F39] bg-[#11151B] p-6 shadow-2xl">

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close payment confirmation"
          className="absolute right-4 top-4 rounded-lg border border-transparent p-2 text-[#8993A1] transition duration-200 hover:border-[#292F39] hover:bg-[#151A22] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl border border-blue-500/15 bg-blue-500/[0.08] text-blue-400">
          <CreditCard size={24} />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-white">
          Review your membership
        </h2>

        <p className="mt-1 text-sm leading-6 text-[#8993A1]">
          You're one step away from upgrading your DevCircle experience.
        </p>

        {/* Selected plan */}
        <div className="mt-6 rounded-xl border border-[#292F39] bg-[#0B0D10] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#A7B7CD]">
              Selected plan
            </span>

            <span className="flex items-center gap-1 text-xs text-blue-400">
              <BadgeCheck size={14} />
              Membership
            </span>
          </div>

          <h3 className="mt-2 text-lg font-bold text-white">
            {plan.name}
          </h3>

          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-sm text-[#A7B7CD]">₹</span>

            <span className="text-3xl font-black text-white">
              {plan.price}
            </span>

            <span className="text-xs text-[#8993A1]">
              / month
            </span>
          </div>
        </div>

        {/* Security information */}
        <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#8993A1]">
          <ShieldCheck
            size={16}
            className="mt-0.5 shrink-0 text-emerald-400"
          />

          <p>
            Secure payment powered by Razorpay. Your membership will be
            activated after successful payment verification.
          </p>
        </div>

        {/* Continue button */}
        <button
          type="button"
          onClick={() => onContinue?.(plan.id)}
          disabled={isLoading}
          className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#292F39] bg-[#151A22] px-5 py-3.5 text-sm font-semibold text-[#F0F2F5] transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />
              Processing...
            </>
          ) : (
            <>
              Continue to payment
              <ArrowRight
                size={16}
                className="text-blue-400 transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        <p className="mt-3 text-center text-[10px] text-[#68717E]">
          Monthly subscription · Amount in INR
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
