import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";
import classNames from "classnames";
import { FEES, MEDIUMS } from "../../../constants/base";

const PaperCard = ({ _id, exam, medium, fee, year }) => {
  return (
    <Link to={`${MCQ_ALL_PATH}/${_id}`}>
      <div className="relative flex flex-col w-full gap-4 p-5 border border-purple-400 rounded-xl">
        <h3 className="text-lg font-bold">
          G.C.E {exam ? "Advanced Level" : "Ordinary Level"}
        </h3>
        <div className="flex justify-between">
          <div
            className={classNames(
              "px-3 py-1 text-sm rounded-lg border border-purple-300 right-1 top-1"
            )}
          >
            {year}
          </div>
          <div
            className={classNames(
              "px-3 py-1 text-sm rounded-lg right-1 top-1",
              fee === FEES.FREE ? "bg-green-200" : "bg-red-200"
            )}
          >
            {fee}
          </div>
          <div
            className={classNames(
              "px-3 py-1 text-sm rounded-lg border border-purple-300 right-1 top-1",
              medium === MEDIUMS.ENGLISH ? "bg-blue-200" : "bg-orange-200"
            )}
          >
            {medium}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PaperCard;

PaperCard.propTypes = {
  _id: PropTypes.string.isRequired,
  exam: PropTypes.string.isRequired,
  medium: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
