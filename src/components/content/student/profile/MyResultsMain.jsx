import { useEffect, useState } from "react";
import { Edit2, Trash } from "feather-icons-react";
import PageHeader from "../../../shared/headers/PageHeader";
import markService from "../../../../services/mark.service";
import moment from "moment";
import Medal from "../../../shared/Medal";

const MyResultsMain = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllMyResults } = markService();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllMyResults();
        setResults(res.data);
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
              <th className="w-[100px]">Timestamp</th>
              <th className="w-[100px]">Exam</th>
              <th className="w-[100px]">Marks</th>
              <th className="w-[100px]">medal</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : results.length > 0 ? (
              results.map((mark, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {moment
                      .utc(mark.createdAt)
                      .local()
                      .format("YYYY-MM-DD HH:MM A")}
                  </td>
                  <td>{mark.paper.longName}</td>
                  <td>{mark.marks}</td>
                  <td>
                    {mark?.medal && (
                      <Medal medal={mark.medal} className="w-12 h-12" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyResultsMain;
