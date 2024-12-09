import { Link, useParams } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";
import { useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
import { TYPES } from "../../../constants/base";

const MCQPracticeMain = () => {
  const [papers, setPapers] = useState([]);
  const { getPapersByExamAndMedium } = paperService();
  const { exam, medium } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPapersByExamAndMedium(
        `exam=${
          exam === "AL" ? "A/L" : exam === "OL" ? "O/L" : exam
        }&medium=${medium}`
      );
      setPapers(res.data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex p-20 bg-white">
      <div className="flex flex-col max-w-screen-xl gap-5 mx-auto">
        <h1 className="text-4xl font-semibold">
          General Certificate of Education (G.C.E) Advanced Level (A/L) -{" "}
          {medium} Medium
        </h1>
        <h1>Practice Quiz</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <Link
            to={`${MCQ_ALL_PATH}/AL/Sinhala/`}
            className="flex items-center justify-center h-12 text-white bg-purple-500 rounded-full hover:bg-purple-700"
          >
            {medium} Medium
          </Link>
        </div>

        <h1>Past Papers</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {papers?.length > 0 &&
            papers
              ?.filter((paper) => paper?.type === TYPES.PAST)?.[0]
              ?.papers?.map((paper) => (
                <Link
                  to={`${MCQ_ALL_PATH}/${paper?.exam?.replace("/", "")}/${
                    paper?.medium
                  }/${paper?.id}`}
                  key={paper?.id}
                >
                  <div className="flex flex-col justify-center w-full gap-4 p-5 border border-blue-400 rounded-xl">
                    <img
                      src="https://studyhub.themewant.com/wp-content/uploads/2024/03/06.svg"
                      className="w-10 h-10 bg-cover"
                      alt="category"
                      decoding="async"
                    />
                    <div>
                      <h3 className="text-lg font-bold">G.C.E {paper?.exam}</h3>
                      <h3 className="text-lg font-bold">
                        {paper?.medium} Medium
                      </h3>
                      <p className="text-sm text-gray-600">{paper?.year}</p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        <h1>Model Papers</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {papers?.length > 0 &&
            papers
              ?.filter((paper) => paper?.type === TYPES.MODEL)?.[0]
              ?.papers?.map((paper) => (
                <Link
                  to={`${MCQ_ALL_PATH}/${paper?.exam?.replace("/", "")}/${
                    paper?.medium
                  }/${paper?.id}`}
                  key={paper?.id}
                >
                  <div className="flex flex-col justify-center w-full gap-4 p-5 border border-blue-400 rounded-xl">
                    <img
                      src="https://studyhub.themewant.com/wp-content/uploads/2024/03/06.svg"
                      className="w-10 h-10 bg-cover"
                      alt="category"
                      decoding="async"
                    />
                    <div>
                      <h3 className="text-lg font-bold">G.C.E {paper?.exam}</h3>
                      <h3 className="text-lg font-bold">
                        {paper?.medium} Medium
                      </h3>
                      <p className="text-sm text-gray-600">{paper?.year}</p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MCQPracticeMain;
