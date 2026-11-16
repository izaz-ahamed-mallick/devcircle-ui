import axios from "./axios";

export const createOrderApi = async (planId) => {
  const { data } = await axios.post("/payment/create-order", {
    planId,
  });

  return data;
};
export const getPaymentStatusApi = async (orderId) => {
  const { data } = await axios.get(`/payment/status/${orderId}`);
  return data;
};
