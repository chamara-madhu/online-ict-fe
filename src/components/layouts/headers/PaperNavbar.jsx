import { Link, useNavigate } from "react-router-dom";
import {
  ADMIN_DASHBOARD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  MY_PROFILE_PATH,
} from "../../../constants/routes";
import Cta from "../../shared/Cta";
import Logo from "../../../assets/images/logo.svg";
import { USER_ROLES } from "../../../constants/base";

const PaperNavbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate(HOME_PATH);
  };

  return (
    <nav className="sticky top-0 z-10 px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to={HOME_PATH}>
          <img src={Logo} alt="Online ICT Logo" className="w-[200px]" />
        </Link>

        <div className="flex items-center gap-4">
          {user.name ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-900 cursor-pointer hover:text-purple-500"
              >
                Logout
              </button>
              <Link
                to={
                  user.role === USER_ROLES.ADMIN
                    ? ADMIN_DASHBOARD_PATH
                    : MY_PROFILE_PATH
                }
              >
                <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full cursor-pointer hover:bg-purple-400">
                  {user.name[0]}
                </div>
              </Link>
            </div>
          ) : (
            <>
              <Link
                to={LOGIN_PATH}
                className="font-medium hover:text-purple-500"
              >
                Login
              </Link>
              <Cta label="Get Started" url={REGISTER_PATH} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PaperNavbar;
