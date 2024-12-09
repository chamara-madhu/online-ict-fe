import { Link } from "react-router-dom";
import {
  ADMIN_LESSON_CREATE_PATH,
  ADMIN_PAPER_CREATE_PATH,
  ADMIN_QUESTION_CREATE_PATH,
} from "../../../constants/routes";

const AdminSidebar = () => {
  return (
    <div
      className="flex flex-col gap-1 w-[280px] bg-black overflow-y-auto"
      style={{ height: "calc(100vh - 60px)" }}
    >
      <Link to={ADMIN_PAPER_CREATE_PATH}>
        <div className="flex items-center h-10 px-5 bg-white">Create paper</div>
      </Link>
      <Link to={ADMIN_LESSON_CREATE_PATH}>
        <div className="flex items-center h-10 px-5 bg-white">
          Create lesson
        </div>
      </Link>
      <Link to={ADMIN_QUESTION_CREATE_PATH}>
        <div className="flex items-center h-10 px-5 bg-white">
          Create question
        </div>
      </Link>
    </div>
  );
};

export default AdminSidebar;
