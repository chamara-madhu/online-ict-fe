import { useEffect, useState } from "react";
import paperService from "../../../services/paper.service";
// import { MCQ_ALL_PATH } from "../../../constants/routes";
import CheckedIcon from "../../../assets/icons/check.svg";
import UnCheckedIcon from "../../../assets/icons/un-check.svg";
import {
  EXAM_OPTIONS,
  FEE_OPTIONS,
  MEDIUM_OPTIONS,
} from "../../../constants/base";
import PaperCard from "../../shared/cards/PaperCard";

const initialFilters = {
  exam: [],
  medium: [],
  fee: [],
};

const MCQMain = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [papers, setPapers] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc"); // 'desc' for High to Low, 'asc' for Low to High
  const { getAllPapers } = paperService();

  // Handle checkbox change for multiple selection
  const handleCheckboxChange = (filterType, value) => {
    setFilters((prevFilters) => {
      const updatedFilter = [...prevFilters[filterType]];
      if (updatedFilter.includes(value)) {
        // Remove value if already selected (uncheck)
        const index = updatedFilter.indexOf(value);
        updatedFilter.splice(index, 1);
      } else {
        // Add value if not selected (check)
        updatedFilter.push(value);
      }
      return {
        ...prevFilters,
        [filterType]: updatedFilter,
      };
    });
  };

  const handleResetFilter = () => {
    setFilters(initialFilters);
  };

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await getAllPapers();
      setPapers(res?.data || []);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    // Sort papers whenever sortOrder changes
    setPapers((prevPapers) => {
      return [...prevPapers].sort((a, b) => {
        if (sortOrder === "desc") {
          return b.year - a.year; // High to Low
        } else {
          return a.year - b.year; // Low to High
        }
      });
    });
  }, [sortOrder]);

  return (
    <div className="flex w-full gap-7">
      <div className="flex flex-col gap-5 w-[280px]">
        <div className="flex items-center justify-between w-full h-fit">
          <p className="text-lg font-semibold">Filters</p>
          <span
            className="text-sm text-gray-400 cursor-pointer hover:text-purple-700"
            onClick={handleResetFilter}
          >
            Reset
          </span>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Exam Type</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {EXAM_OPTIONS.map((exam) => (
              <label
                key={exam.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="exam-type"
                  className="hidden peer"
                  value={exam.value}
                  checked={filters.exam.includes(exam.value)}
                  onChange={() => handleCheckboxChange("exam", exam.value)}
                />
                <img
                  src={
                    filters.exam.includes(exam.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">G.C.E {exam.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Medium</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {MEDIUM_OPTIONS.map((medium) => (
              <label
                key={medium.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="medium-type"
                  className="hidden peer"
                  value={medium.value}
                  checked={filters.medium.includes(medium.value)}
                  onChange={() => handleCheckboxChange("medium", medium.value)}
                />
                <img
                  src={
                    filters.medium.includes(medium.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{medium.label}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Fees</p>
          <div className="flex flex-col overflow-hidden rounded-md">
            {FEE_OPTIONS.map((fee) => (
              <label
                key={fee.value}
                className="flex items-center h-10 gap-3 px-3 cursor-pointer bg-purple-50 hover:bg-purple-100"
              >
                <input
                  type="checkbox"
                  name="fee-type"
                  className="hidden peer"
                  value={fee.value}
                  checked={filters.fee.includes(fee.value)}
                  onChange={() => handleCheckboxChange("fee", fee.value)}
                />
                <img
                  src={
                    filters.fee.includes(fee.value)
                      ? CheckedIcon
                      : UnCheckedIcon
                  }
                  alt="check icon"
                />
                <span className="text-sm">{fee.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col" style={{ width: "calc(100% - 280px)" }}>
        <div className="flex items-end justify-between">
          <span className="text-sm text-gray-500">
            {papers?.length || 0} papers
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Sort by (year):
            </span>
            <div
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                sortOrder === "desc"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 hover:bg-purple-500"
              }`}
              onClick={handleSortOrderChange}
            >
              High to Low
            </div>
            <div
              className={`px-3 py-2 rounded-lg cursor-pointer ${
                sortOrder === "asc"
                  ? "bg-purple-500 text-white"
                  : "bg-purple-50 hover:bg-purple-500"
              }`}
              onClick={handleSortOrderChange}
            >
              Low to High
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 mt-5 md:grid-cols-4">
          {papers?.length > 0 &&
            papers?.map((paper, index) => <PaperCard key={index} {...paper} />)}
        </div>
      </div>
    </div>
  );
};

export default MCQMain;
