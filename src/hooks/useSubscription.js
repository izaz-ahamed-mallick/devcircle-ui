
import { useCurrentUser } from "./useCurrentUser";

export const useSubscription = () => {
  const { data: profileData, isLoading, isError } = useCurrentUser();

  const user = profileData?.user ?? profileData;

  const hasActivePlan = user?.isUserHavePlan === true;
  const currentPlan = hasActivePlan
    ? user?.currentPlan?.toLowerCase()
    : null;

  const isBasic = currentPlan === "basic";
  const isPremium = currentPlan === "premium";
  const isPro = currentPlan === "pro";

  const hasPaidPlan = isBasic || isPremium || isPro;

  // Feature access helpers
  const canAccess = (requiredPlan) => {
    const planLevels = {
      basic: 1,
      premium: 2,
      pro: 3,
    };

    const userLevel = planLevels[currentPlan] || 0;
    const requiredLevel = planLevels[requiredPlan] || Infinity;

    return userLevel >= requiredLevel;
  };

  return {
    user,
    currentPlan,
    hasActivePlan,
    hasPaidPlan,
    isBasic,
    isPremium,
    isPro,
    canAccess,
    isLoading,
    isError,
  };
};
