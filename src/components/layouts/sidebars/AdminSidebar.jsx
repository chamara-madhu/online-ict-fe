import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Plus, Edit2, File, Grid } from "feather-icons-react";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LESSON_CREATE_PATH,
  ADMIN_LESSON_MANAGE_PATH,
  ADMIN_PAPER_CREATE_PATH,
  ADMIN_PAPER_MANAGE_PATH,
  ADMIN_QUESTION_CREATE_PATH,
  ADMIN_QUESTION_MANAGE_PATH,
} from "../../../constants/routes";

// Define menu items dynamically
const menuItems = [
  {
    path: ADMIN_DASHBOARD_PATH,
    label: "Dashboard",
    icon: Grid,
    isParent: false,
  },
  {
    label: "Papers",
    icon: File,
    isParent: true,
  },
  {
    path: ADMIN_PAPER_CREATE_PATH,
    label: "Create paper",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_PAPER_MANAGE_PATH,
    label: "Manage paper",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "Lessons",
    icon: File,
    isParent: true,
  },
  {
    path: ADMIN_LESSON_CREATE_PATH,
    label: "Create lesson",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_LESSON_MANAGE_PATH,
    label: "Manage lesson",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "Questions",
    icon: File,
    isParent: true,
  },
  {
    path: ADMIN_QUESTION_CREATE_PATH,
    label: "Create question",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_QUESTION_MANAGE_PATH,
    label: "Manage question",
    icon: Edit2,
    isParent: false,
  },
];

const AdminSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="flex sticky top-[72px] flex-col w-[300px] h-full bg-purple-50 border-r border-purple-100 pb-4"
      style={{ height: "calc(100vh - 60px)" }}
    >
      {menuItems.map((item, index) => {
        const isActive = item.path && pathname === item.path;
        const IconComponent = item.icon;

        return item.isParent ? (
          <div
            key={index}
            className="flex text-sm font-semibold bg-purple-300 items-center gap-3 px-4 h-[40px]"
          >
            <IconComponent size={16} />
            {item.label}
          </div>
        ) : (
          <Link to={item.path || "#"} key={index}>
            <div
              className={classNames(
                "flex text-sm items-center gap-2",
                item.isParent ? "px-4" : "pl-10",
                "h-[40px]",
                isActive
                  ? "bg-purple-100 border-r-4 border-purple-700 font-medium"
                  : ""
              )}
            >
              <IconComponent size={16} />
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
