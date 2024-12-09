import { useEffect, useState } from "react";
import markService from "../../../../services/mark.service";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import Button from "../../../shared/buttons/Button";
import Medal from "../../../shared/Medal";

const MarkMain = () => {
  const [marks, setMarks] = useState(null);

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

  return (
    <div className="flex px-20 pt-10 pb-20">
      <div className="flex flex-col w-full max-w-screen-xl gap-10 mx-auto">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{marks?.paper?.longName}</h1>
          <div className="flex flex-wrap gap-2">
            {marks?.correctAnswers} / {marks?.totalQuestions} {marks?.marks}%
          </div>
          {marks?.medal && <Medal medal={marks.medal} />}
        </div>
      </div>
    </div>
  );
};

export default MarkMain;
