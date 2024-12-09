import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import paperService from "../../../../services/paper.service";
import PageHeader from "../../../shared/headers/PageHeader";

const ManagePaperMain = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getAllPapers, deletePaper } = paperService();

  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await getAllPapers();
        setPapers(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  const handleDeletePaper = async (id) => {
    try {
      await deletePaper(id);
      toast.success("Paper successfully deleted!");
      const filter = papers.filter((paper) => paper._id !== id);
      setPapers(filter);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Manage Paper" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[100px]">Exam</th>
              <th className="w-[100px]">Year</th>
              <th className="w-[100px]">Type</th>
              <th className="w-[100px]">Medium</th>
              <th className="w-[200px]">Long name</th>
              <th className="w-[100px]">Fee</th>
              <th>Statistics</th>
              <th className="w-[100px]">Status</th>
              <th className="w-[110px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : papers.length > 0 ? (
              papers.map((paper, index) => (
                <tr key={index} className="text-sm">
                  <td>{paper.exam}</td>
                  <td>{paper.year}</td>
                  <td>{paper.type}</td>
                  <td>{paper.medium}</td>
                  <td>{paper?.longName}</td>
                  <td>{paper.fee}</td>
                  <td>
                    {paper?.stats && (
                      <p>{`No of students: ${paper?.stats?.noOfStuds}, A: ${paper?.stats?.a}, B: ${paper?.stats?.b}, S: ${paper?.stats?.s}, F: ${paper?.stats?.f}`}</p>
                    )}
                  </td>
                  <td>{paper.status ? "Active" : "Inactive"}</td>
                  <td>
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700">
                        <Edit2 size={16} />
                      </div>
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                        onClick={() => handleDeletePaper(paper._id)}
                      >
                        <Trash size={16} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  No papers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagePaperMain;
