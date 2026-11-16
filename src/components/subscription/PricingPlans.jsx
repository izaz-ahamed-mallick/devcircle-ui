
import {
  Check,
  Crown,
  Gem,
  Zap,
  Sparkles,
  ArrowRight,
  BadgeCheck,
  LockKeyhole,
  CalendarDays,
} from "lucide-react";
import { PLANS } from "../../utils/Plans";

const PLAN_ICONS = {
  basic: Zap,
  premium: Crown,
  pro: Gem,
};

const PricingPlans = ({
  onSelectPlan,
  currentPlan,
  hasActivePlan,
  planExpiryDate,
  isLoading = false,
  selectedPlan,
}) => {
  const expiryDate = planExpiryDate
    ? new Date(planExpiryDate)
    : null;

  const formattedExpiryDate =
    expiryDate && !Number.isNaN(expiryDate.getTime())
      ? expiryDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : null;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#0B0D10] px-4 py-6 text-[#F0F2F5] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-7 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#344255] bg-[#151D28] px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-[#B9C9E5]">
            <Sparkles size={13} />
            THE DEVCIRCLE EXPERIENCE
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            LEVEL UP.
            <span className="mx-2 bg-gradient-to-r from-[#A7C8FF] via-[#6F9FEF] to-[#A58BFF] bg-clip-text text-transparent">
              LINK UP.
            </span>
            <span className="block sm:inline">STAND OUT.</span>
          </h1>

          <p className="mt-3 text-sm text-[#8993A1]">
            More connections. More visibility. More opportunities.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch md:gap-5">
          {PLANS.map((plan) => {
            const Icon = PLAN_ICONS[plan.id] || Zap;
            const isCurrentPlan =
              hasActivePlan && currentPlan === plan.id;
            const isSelected = selectedPlan === plan.id;
            const isButtonLoading = isLoading && isSelected;

            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border ${plan.accent} bg-gradient-to-b from-[#151A22] to-[#101319] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20 ${
                  plan.popular ? "md:scale-[1.025]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#6C83B4]/50 bg-[#263B5E] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#DCE7F7]">
                    <Sparkles size={11} className="mr-1 inline" />
                    Fan Favourite
                  </div>
                )}

                {/* Plan heading */}
                <div className="flex items-center justify-between">
                  <div className={`grid size-10 place-items-center rounded-xl ${plan.iconBg}`}>
                    <Icon size={20} className={plan.iconColor} />
                  </div>

                  {isCurrentPlan && (
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                      Current plan
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-lg font-bold text-white">
                  {plan.name}
                </h2>

                <p className="mt-1 text-xs text-[#8993A1]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm font-medium text-[#A7B7CD]">
                    ₹
                  </span>

                  <span className="text-4xl font-black tracking-tight text-white">
                    {plan.price}
                  </span>

                  <span className="ml-1 text-xs text-[#8993A1]">
                    / month
                  </span>
                </div>

                {/* Plan expiry */}
                {isCurrentPlan && formattedExpiryDate && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#292F39] bg-[#11151B] px-3 py-2.5">
                    <CalendarDays
                      size={15}
                      className="shrink-0 text-blue-400"
                    />

                    <div>
                      <p className="text-[10px] text-[#8993A1]">
                        Membership expires on
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-[#D5DBE5]">
                        {formattedExpiryDate}
                      </p>
                    </div>
                  </div>
                )}

                <div className="my-4 border-t border-white/[0.08]" />

                {/* Features */}
                <div className="flex-1 space-y-3">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7F8A99]">
                    What's included
                  </p>

                  {plan.features.map((feature) => (
                    <div
                      key={feature.label}
                      className={`flex items-center gap-2.5 text-xs ${
                        feature.included
                          ? "text-[#D5DBE5]"
                          : "text-[#68717E]"
                      }`}
                    >
                      {feature.included ? (
                        feature.badge ? (
                          <BadgeCheck
                            size={16}
                            className="shrink-0 fill-blue-500 text-white"
                          />
                        ) : (
                          <Check
                            size={15}
                            className="shrink-0 text-[#83A9E8]"
                          />
                        )
                      ) : (
                        <LockKeyhole
                          size={13}
                          className="shrink-0 text-[#59616D]"
                        />
                      )}

                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>

                {/* Purchase button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!isCurrentPlan) onSelectPlan?.(plan.id);
                  }}
                  disabled={isLoading || isCurrentPlan}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                    isCurrentPlan
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : plan.buttonClass
                  }`}
                >
                  {isButtonLoading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <BadgeCheck size={16} />
                      Current Plan
                    </>
                  ) : (
                    <>
                      Get {plan.name}
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </article>
            );
          })}
        </section>

        {/* Footer */}
        <footer className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-5 sm:flex-row">
          <p className="text-[11px] text-[#747F8E]">
            Built for developers. Powered by connections.
          </p>

          <p className="flex items-center gap-1.5 text-[11px] text-[#747F8E]">
            <BadgeCheck size={14} className="text-blue-400" />
            DevCircle Membership
          </p>
        </footer>
      </div>
    </main>
  );
};

export default PricingPlans;
