
import {
  ArrowRight,
  RotateCcw,
  Home,
  ShieldCheck,
  BadgeCheck,
  Sparkles,
} from "lucide-react";

import { RESULT_CONFIG } from "../../utils/resultConfig";

const PaymentResultModal = ({
  status = "failed",
  plan,
  paymentId,
  message,
  onRetry,
  onGoHome,
  isLoading = false,
}) => {
  const config = RESULT_CONFIG[status];

  if (!config) return null;

  const Icon = config.icon;

  // Backend uses "paid" for successful payments.
  const isSuccess = ["paid", "success"].includes(status);

  const accentColor = isSuccess
    ? "bg-emerald-400"
    : status === "cancelled"
      ? "bg-amber-400"
      : "bg-red-400";

  const glowColor = isSuccess
    ? "shadow-emerald-500/10"
    : status === "cancelled"
      ? "shadow-amber-500/10"
      : "shadow-red-500/10";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/75 px-4 py-6 backdrop-blur-lg">

      {/* Modal */}
      <div
        className={`relative my-auto w-full max-w-[480px] overflow-hidden rounded-3xl border border-[#292F39] bg-[#11151B] shadow-2xl ${glowColor}`}
      >
        {/* Top accent */}
        <div className={`h-[3px] w-full ${accentColor}`} />

        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-blue-500/[0.04] blur-3xl" />

        <div className="relative p-6 sm:p-8">

          {/* Status icon */}
          <div className="flex justify-center">
            <div
              className={`relative flex size-24 items-center justify-center rounded-full ${config.iconBg}`}
            >
              <div className="absolute inset-2 rounded-full border border-current opacity-10" />

              <Icon
                size={43}
                strokeWidth={1.7}
                className={config.iconColor}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-6 text-center">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border border-current/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${config.badgeColor}`}
            >
              {isSuccess && <BadgeCheck size={13} />}
              {config.badge}
            </span>

            <h2 className="mt-5 text-[26px] font-extrabold tracking-tight text-[#F0F2F5] sm:text-3xl">
              {config.title}
            </h2>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8993A1]">
              {message || config.description}
            </p>
          </div>

          {/* Plan details */}
          {plan && (
            <div
              className={`mt-8 overflow-hidden rounded-2xl border ${config.border} bg-[#0B0D10]`}
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <span className="text-xs font-medium text-[#8993A1]">
                  Membership details
                </span>

                <span className="flex items-center gap-1.5 text-xs font-semibold text-blue-400">
                  <ShieldCheck size={15} />
                  DevCircle
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-5">
                <div>
                  <h3 className="text-lg font-bold text-[#F0F2F5]">
                    {plan.name}
                  </h3>

                  <p className="mt-1 text-xs text-[#747F8E]">
                    Monthly membership
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold tracking-tight text-white">
                    ₹{plan.price}
                  </p>

                  <p className="mt-1 text-[10px] text-[#747F8E]">
                    / month
                  </p>
                </div>
              </div>

              {paymentId && (
                <div className="mx-5 border-t border-white/[0.07] py-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#747F8E]">
                      Payment ID
                    </p>

                    {isSuccess && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <BadgeCheck size={12} />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="mt-2 break-all font-mono text-xs text-[#A7B7CD]">
                    {paymentId}
                  </p>
                </div>
              )}
            </div>
          )}


          {/* Action buttons */}
          {isSuccess ? (
            <button
              type="button"
              onClick={onGoHome}
              className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#292F39] bg-[#151A22] px-5 py-3.5 text-sm font-semibold text-[#F0F2F5] transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/[0.06]"
            >
              <Home
                size={17}
                className="text-blue-400"
                strokeWidth={1.9}
              />
              Go to DevCircle
              <ArrowRight
                size={16}
                className="text-blue-400 transition-transform group-hover:translate-x-1"
              />
            </button>
          ) : (
            <>

              {/* Try Again */}
              <button
                type="button"
                onClick={onRetry}
                disabled={isLoading}
                className="group mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#292F39] bg-[#151A22] px-5 py-3.5 text-sm font-semibold text-[#F0F2F5] transition-all duration-200 hover:border-blue-500/50 hover:bg-blue-500/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-blue-400/30 border-t-blue-400" />
                    <span className="text-[#A7B7CD]">Processing...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw
                      size={16}
                      strokeWidth={1.9}
                      className="text-blue-400 transition-transform duration-200 group-hover:-rotate-45"
                    />
                    Try Again
                    <ArrowRight
                      size={16}
                      className="text-blue-400 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              {/* Back to Home */}
              <button
                type="button"
                onClick={onGoHome}
                className="group mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#292F39] bg-transparent px-5 py-3.5 text-sm font-medium text-[#A7B7CD] transition-all duration-200 hover:border-[#3B82F6]/40 hover:bg-[#171D26] hover:text-[#F0F2F5]"
              >
                <Home
                  size={16}
                  strokeWidth={1.8}
                  className="text-[#8993A1] transition-colors group-hover:text-blue-400"
                />
                Back to Home
              </button>

            </>
          )}


          {/* Footer */}
          <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/[0.06] pt-5">
            <ShieldCheck size={14} className="text-[#68717E]" />

            <p className="text-[10px] font-medium tracking-wide text-[#68717E]">
              Secure payments powered by Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentResultModal;
