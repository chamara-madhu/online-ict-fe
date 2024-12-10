import axios from "./base";

const onlinePayment = async (data) => {
  return await axios.post("/payments/create-checkout-session", { ...data });
};

const addPaymentRecord = async (data) => {
  return await axios.post("/payments", { ...data });
};

const getAllMyPurchasing = async () => {
  return await axios.get("/payments/my");
};

export default {
  onlinePayment,
  addPaymentRecord,
  getAllMyPurchasing,
};
