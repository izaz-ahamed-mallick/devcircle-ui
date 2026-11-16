import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrderApi, getPaymentStatusApi } from "../api/paymentApi";


export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (planId) => createOrderApi(planId),
  });
};


export const usePaymentStatus = (orderId) =>
  useQuery({
    queryKey: ["paymentStatus", orderId],
    queryFn: () => getPaymentStatusApi(orderId),
    enabled: Boolean(orderId),
    refetchInterval: (query) => {
      if (query.state.status === "error") return false;

      const status = query.state.data?.payment?.status;

      if (["paid", "failed"].includes(status)) return false;

      return 3000;
    },
    retry: false,
  });
