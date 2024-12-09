import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  // CONTACT_US_PATH,
  HOME_PATH,
  // PRICING_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  STUDENT_PROFILE_PATH,
  ADMIN_DASHBOARD_PATH,
} from "../../../constants/routes";
import Cta from "../../shared/Cta";
import Logo from "../../../assets/images/logo.svg";
import { USER_ROLES } from "../../../constants/base";

const navLinks = [
  { href: HOME_PATH, label: "Home" },
  // { href: PRICING_PATH, label: "Pricing" },
  // { href: CONTACT_US_PATH, label: "Contact us" },
];

const Navbar = () => {
  const location = useLocation();
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
        <div className="flex items-center justify-center gap-7">
          <Link to={HOME_PATH}>
            <img src={Logo} alt="Online ICT Logo" className="w-[200px]" />
          </Link>

          <ul className={`flex flex-col md:flex-row md:gap-10`}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={`hover:text-purple-500 ${
                    location.pathname === href ? "text-purple-500" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
                    : STUDENT_PROFILE_PATH
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

export default Navbar;
