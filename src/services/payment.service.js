import ApiIndex from "../api";

const paymentService = () => ({
  onlinePayment: (data) => ApiIndex.PaymentApi.onlinePayment(data),
  addPaymentRecord: (data) => ApiIndex.PaymentApi.addPaymentRecord(data),
  getAllMyPurchasing: (data) => ApiIndex.PaymentApi.getAllMyPurchasing(data),
});

export default paymentService;
