import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MCQ_ALL_PATH } from "../../../constants/routes";
import { Button } from "evergreen-ui";

const PaperCard = ({ _id, exam, medium, type, year }) => {
  return (
    <Link to={`${MCQ_ALL_PATH}/${_id}`}>
      <div className="flex flex-col w-full gap-4 p-5 border border-purple-400 rounded-xl">
        {/* <img
          src="https://studyhub.themewant.com/wp-content/uploads/2024/03/06.svg"
          className="w-10 h-10 bg-cover"
          alt="category"
          decoding="async"
        /> */}
        <h3 className="text-lg font-bold">
          G.C.E {exam ? "Advanced Level" : "Ordinary Level"} - {year} ({medium})
        </h3>
        {/* <h3 className="text-lg font-bold">{medium}</h3>
          <p className="text-sm text-gray-600">{type}</p> */}
        {/* <p className="text-sm text-gray-600">{year}</p> */}
        <Button
          className="h-8 px-6 bg-purple-500 border-0 rounded-full w-fit hover:bg-purple-700"
          appearance="primary"
          size="large"
          // onClick={handleSubmit(handleCreateLesson)}
        >
          Buy
        </Button>
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
