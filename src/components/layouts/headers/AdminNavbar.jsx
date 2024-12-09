import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH } from "../../../constants/routes";
import Logo from "../../../assets/images/logo.svg";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate(HOME_PATH);
  };

  return (
    <nav className="sticky top-0 z-10 px-4 py-3 h-[60px] bg-white border-b-2 border-purple-200">
      <div className="flex items-center justify-between">
        <Link to={HOME_PATH}>
          <img src={Logo} alt="Online ICT Logo" className="w-[150px]" />
        </Link>
        {user.name && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-sm text-gray-900 cursor-pointer hover:text-purple-500"
            >
              Logout
            </button>
            <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full cursor-pointer hover:bg-purple-400">
              {user.name[0]}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
