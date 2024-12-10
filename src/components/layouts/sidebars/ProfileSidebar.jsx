import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Plus, Edit2, File, Grid } from "feather-icons-react";
import {
  ADMIN_DASHBOARD_PATH,
  MY_PURCHASING_HISTORY_PATH,
  MY_RESULTS_PATH,
} from "../../../constants/routes";

// Define menu items dynamically
const menuItems = [
  {
    path: ADMIN_DASHBOARD_PATH,
    label: "Dashboard",
    icon: Grid,
    isParent: true,
  },
  {
    path: MY_PURCHASING_HISTORY_PATH,
    label: "Purchasing History",
    icon: Grid,
    isParent: true,
  },
  {
    path: MY_RESULTS_PATH,
    label: "Results",
    icon: Grid,
    isParent: true,
  },
];

const ProfileSidebar = () => {
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
          <Link to={item.path || "#"} key={index}>
            <div className="flex text-sm font-semibold bg-purple-100 items-center gap-3 px-4 h-[40px]">
              <IconComponent size={16} />
              {item.label}
            </div>
          </Link>
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

export default ProfileSidebar;
