import { useEffect, useState } from "react";
import markService from "../../../../services/mark.service";
import { useParams } from "react-router-dom";
import html2PDF from "jspdf-html2canvas";
import Button from "../../../shared/buttons/Button";
import Medal from "../../../shared/Medal";

const MarkMain = () => {
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);

  const { markId } = useParams();

  const { getMarksByMarkId } = markService();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMarksByMarkId(markId);
      console.log({ res });
      setMarks(res?.data || null);
    };

    if (markId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownload = () => {
    setLoading(true);

    const node = document.getElementById("my-node");

    html2PDF(node, {
      jsPDF: {
        format: "a6",
      },
      imageType: "image/jpeg",
      output: `./${marks?.paper?.longName}.pdf`,
    });

    setLoading(false);
  };

  return (
    <div className="flex px-20 pt-10 pb-20">
      <div
        className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto"
        id="my-node"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold text-purple-600">
            {marks?.paper?.longName || "Exam Results"}
          </h1>
          <p className="text-lg text-gray-500">
            Here is your performance summary!
          </p>
        </div>

        {/* Medal Section */}
        {marks?.medal && (
          <div className="flex items-center justify-center mt-6">
            <Medal medal={marks.medal} className="w-[100px]" />
          </div>
        )}

        {/* Performance Summary */}
        <div className="grid grid-cols-1 gap-10 mt-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4 p-5 bg-purple-100 rounded-xl">
            <h2 className="text-4xl font-bold text-purple-700">
              {marks?.correctAnswers || 0} / {marks?.totalQuestions || 0}
            </h2>
            <p className="text-lg font-medium text-purple-600">
              Correct Answers
            </p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 p-5 bg-green-100 rounded-xl">
            <h2 className="text-4xl font-bold text-green-700">
              {marks?.marks || 0}%
            </h2>
            <p className="text-lg font-medium text-green-600">Total Score</p>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="flex flex-col items-center gap-4 mt-10">
          <p className="text-sm text-gray-500">Download the Result Sheet.</p>
          <Button
            label="Download"
            className="px-6 py-3 text-white bg-purple-600 rounded-lg hover:bg-purple-700"
            handleBtn={handleDownload}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default MarkMain;
