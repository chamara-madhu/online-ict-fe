import ApiIndex from "../api";

const paymentService = () => ({
  onlinePayment: (data) => ApiIndex.PaymentApi.onlinePayment(data),
  addPaymentRecord: (data) => ApiIndex.PaymentApi.addPaymentRecord(data),
});

export default paymentService;
