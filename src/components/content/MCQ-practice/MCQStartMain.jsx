import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MCQ_ALL_PATH, MCQ_BUY_PAPER_PATH } from "../../../constants/routes";
import StudentRankCard from "../../shared/cards/StudentRankCard";
import { useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
import { EXAMS, FEES } from "../../../constants/base";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import markService from "../../../services/mark.service";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MCQStartMain = () => {
  const [paper, setPaper] = useState([]);
  const [highestMarkStudents, setHighestMarkStudents] = useState([]);
  const [eligibility, setEligibility] = useState(null);

  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const { paperId } = useParams();

  const { getHighestMarkStudentsByPaperId } = markService();
  const { getPaperById, checkEligibility } = paperService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPaperById(paperId);
      setPaper(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await checkEligibility(paperId);
      setEligibility(res.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getHighestMarkStudentsByPaperId(paperId);
      setHighestMarkStudents(res?.data || []);
    };

    if (paperId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex gap-10">
      <div className="flex flex-col w-[40%] gap-7 h-fit">
        <div className="flex flex-col w-full gap-10 p-5 rounded-lg bg-purple-50 h-fit">
          {user?.name ? <p>Hey {user.name}</p> : null}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">Welcome to</h1>
            <h1 className="text-3xl font-semibold">
              G.C.E -{" "}
              {paper?.exam === EXAMS.AL ? "Advanced Level" : "Ordinary Level"} -{" "}
              {paper?.year}
            </h1>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Medium</p>
            <p>{paper?.medium}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">No. of questions</p>
            <p>5 questions</p>
          </div>
        </div>
        {highestMarkStudents?.length > 0 && (
          <div className="flex flex-col w-full p-5 rounded-lg bg-purple-50 h-fit">
            <h2 className="mb-4 text-lg font-semibold text-purple-700">
              Leaderboard
            </h2>
            <div className="flex flex-col gap-3">
              {highestMarkStudents.map((student, i) => (
                <StudentRankCard key={student?._id} no={i + 1} {...student} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col w-[60%] gap-7">
        <h1 className="text-2xl font-semibold">Instructions</h1>
        <ol className="pl-5 list-decimal">
          <li className="mb-4">
            <p className="text-gray-700">
              This is a timed test. Please make sure you are not interrupted
              during the test, as the timer cannot be paused once started.
            </p>
          </li>
          <li className="mb-4">
            <p className="text-gray-700">
              Please ensure you have a stable internet connection.
            </p>
          </li>
          <li>
            <p className="text-gray-700">
              We recommend you to try the sample test for a couple of minutes
              before taking the main test.
            </p>
          </li>
        </ol>
        {(paper?.fee === FEES.FREE && eligibility?.attemptsRemaining > 0) ||
        (paper?.fee === FEES.PAID && eligibility?.attemptsRemaining > 0) ? (
          <Link
            to={`${MCQ_ALL_PATH}/exam/${paper?._id}`}
            className="flex items-center justify-center h-12 px-10 text-white bg-purple-500 rounded-full w-fit hover:bg-purple-700"
          >
            Start Now
          </Link>
        ) : null}{" "}
        {paper?.fee === FEES.PAID && eligibility?.isNeedToBuy && (
          <Link
            to={`${MCQ_BUY_PAPER_PATH.replace(":paperId", "")}${paper?._id}`}
            className="flex items-center justify-center h-12 px-10 text-white bg-purple-500 rounded-full w-fit hover:bg-purple-700"
          >
            Buy Now
          </Link>
        )}
        {eligibility?.attemptsRemaining ? (
          <p className="text-sm font-medium text-purple-500">
            {eligibility?.attemptsRemaining > 0
              ? `${eligibility?.attemptsRemaining} attempt(s) remaining`
              : "All attempts has been used."}
          </p>
        ) : null}
        <hr />
        <div className="flex flex-col gap-7">
          {paper?.stats?.noOfStuds && (
            <>
              <div className="flex flex-col w-full p-6 border border-purple-200 rounded-lg h-fit">
                <h2 className="mb-4 text-lg font-semibold text-purple-700">
                  Actual Statistics
                </h2>
                <p className="mb-4 text-sm text-gray-500">
                  According to the student performance data collected from{" "}
                  <a
                    href="https://doenets.lk/statistics"
                    className="text-purple-500"
                    target="_blank"
                  >
                    https://doenets.lk/statistics
                  </a>
                  , the following statistics represent the actual results.
                </p>
                <p className="mb-4 text-sm text-gray-700">
                  <b>{paper?.stats?.noOfStuds?.toLocaleString()}</b> students
                  face the exam.
                </p>
                <div className="flex gap-7">
                  <div className="flex w-1/2">
                    <table className="w-full text-sm text-gray-800 border border-collapse border-gray-300">
                      <thead>
                        <tr className="bg-purple-100">
                          <th className="px-4 py-2 text-left border border-gray-300">
                            Grade
                          </th>
                          <th className="px-4 py-2 text-left border border-gray-300">
                            No. of Students
                          </th>
                          <th className="px-4 py-2 text-right border border-gray-300">
                            %
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(paper?.stats)
                          .slice(1)
                          .map(([key, value]) => (
                            <tr key={key} className="h-10">
                              <td className="px-4 border border-gray-300">
                                {key?.toUpperCase()}
                              </td>
                              <td className="px-4 border border-gray-300">
                                {value?.toLocaleString()}
                              </td>
                              <td className="px-4 text-right border border-gray-300">
                                {(
                                  (value / paper?.stats?.noOfStuds) *
                                  100
                                ).toFixed(2)}{" "}
                                %
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex w-1/2">
                    <Pie
                      data={{
                        labels: Object.entries(paper.stats)
                          .slice(1)
                          .map(([key]) => key.toUpperCase()),
                        datasets: [
                          {
                            data: Object.entries(paper.stats)
                              .slice(1)
                              .map(([_, value]) => value),
                            backgroundColor: [
                              "#4BC0C0", // Teal
                              "#36A2EB", // Blue
                              "#9966FF", // Purple
                              "#FFCE56", // Yellow
                              "#FF6384", // Red
                            ],
                            hoverBackgroundColor: [
                              "#4BC0C0CC",
                              "#36A2EBCC",
                              "#9966FFCC",
                              "#FFCE56CC",
                              "#FF6384CC",
                            ],
                          },
                        ],
                      }}
                      options={{
                        responsive: false, // Disable responsiveness
                        maintainAspectRatio: false, // Prevent aspect ratio from being maintained
                        plugins: {
                          legend: {
                            position: "right", // Position the legend at the top of the chart
                          },
                          datalabels: {
                            color: "#000",
                            font: {
                              weight: "bold",
                              size: 12,
                            },
                            formatter: (value, ctx) => {
                              const percentage = (
                                (value / paper.stats.noOfStuds) *
                                100
                              ).toFixed(2);
                              return `${
                                ctx.chart.data.labels[ctx.dataIndex]
                              }: ${percentage}%`;
                            },
                            align: "start",
                            anchor: "end",
                          },
                        },
                      }}
                      height={250} // Set height directly
                      width={300} // Set width directly
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MCQStartMain;
