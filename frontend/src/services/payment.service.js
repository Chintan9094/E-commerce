import api from "../api/axios";

export const createRazorpayOrder = (orderId) => {
  return api.post("/payments/razorpay/order", { orderId });
};

export const verifyRazorpayPayment = (data) => {
  return api.post("/payments/razorpay/verify", data);
};
