import { useEffect, useState } from "react";
import moment from "moment";
import PageHeader from "../../../shared/headers/PageHeader";
import paymentService from "../../../../services/payment.service";
import { CURRENCY } from "../../../../constants/base";

const PurchasingHistoryMain = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllMyPurchasing } = paymentService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllMyPurchasing();
        setHistory(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PageHeader title="My Purchasing History" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[200px]">Timestamp</th>
              <th className="">Paper</th>
              <th className="w-[100px]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : history.length > 0 ? (
              history.map((payment, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {moment
                      .utc(payment.createdAt)
                      .local()
                      .format("YYYY-MM-DD HH:MM A")}
                  </td>
                  <td>{payment.paper.longName}</td>
                  <td>
                    {CURRENCY} {payment.amount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="py-4 text-center">
                  No history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PurchasingHistoryMain;
