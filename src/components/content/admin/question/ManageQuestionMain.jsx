import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Edit2, Trash } from "feather-icons-react";
import PageHeader from "../../../shared/headers/PageHeader";
import questionService from "../../../../services/question.service";
import { ADMIN_QUESTION_CREATE_PATH } from "../../../../constants/routes";
import { useNavigate } from "react-router-dom";

const ManageQuestionMain = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getAllQuestions, deleteQuestion } = questionService();

  console.log("questions", questions);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await getAllQuestions();
        console.log("res", res.data);
        setQuestions(res.data);
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      toast.success("Question successfully deleted!");
      const filter = questions.filter((paper) => paper._id !== id);
      setQuestions(filter);
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
      <PageHeader title="Manage Question" />
      <div className="overflow-x-auto">
        <table className="w-full border table-fixed">
          <thead className="bg-purple-100 h-14">
            <tr className="text-sm text-left">
              <th className="w-[100px]">Exam</th>
              <th className="w-[20px]">No</th>
              <th className="w-[300px]">Question</th>
              <th className="w-[150px]">Answer option</th>
              <th className="w-[50px]">Correct answer</th>
              <th className="w-[50px]">Difficulty</th>
              <th className="w-[70px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : questions?.length > 0 ? (
              questions.map((question, index) => (
                <tr key={index} className="text-sm">
                  <td>
                    {question.paper.exam} {question.paper.year}{" "}
                    {question.paper.medium} {question.paper.type}{" "}
                    {question.paper.fee}
                  </td>
                  <td>{question.no}</td>
                  <td>
                    {question.question}
                    {question.image}
                    {question.restOfQuestion}
                  </td>
                  <td>
                    {question.options.map((option, i) => (
                      <p key={i}>{option}</p>
                    ))}
                  </td>
                  <td>{question.answer[0]}</td>
                  <td>{question.difficulty}</td>
                  <td>
                    <div className="flex gap-2">
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-purple-500 rounded-lg cursor-pointer hover:bg-purple-700"
                        onClick={() =>
                          navigate(
                            `${ADMIN_QUESTION_CREATE_PATH}/${question._id}`
                          )
                        }
                      >
                        <Edit2 size={16} />
                      </div>
                      <div
                        className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700"
                        onClick={() => handleDeleteQuestion(question._id)}
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
                  No questions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageQuestionMain;
