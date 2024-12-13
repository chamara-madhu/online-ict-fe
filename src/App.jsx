import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import {
  ADMIN_DASHBOARD_PATH,
  ADMIN_LESSON_CREATE_PATH,
  ADMIN_LESSON_MANAGE_PATH,
  ADMIN_PAPER_CREATE_PATH,
  ADMIN_PAPER_MANAGE_PATH,
  ADMIN_QUESTION_CREATE_PATH,
  ADMIN_QUESTION_MANAGE_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MCQ_BUY_PAPER_PATH,
  MCQ_EXAM_MARK_PATH,
  MCQ_EXAM_PATH,
  MCQ_PAPER_PATH,
  PAYMENT_SUCCESS_PATH,
  MY_PROFILE_PATH,
  MY_PURCHASING_HISTORY_PATH,
  REGISTER_PATH,
  MY_RESULTS_PATH,
  ADMIN_ALL_USERS_PATH,
  ADMIN_ALL_PAYMENTS_PATH,
  ADMIN_PAPER_EDIT_PATH,
  ADMIN_LESSON_EDIT_PATH,
  ADMIN_QUESTION_EDIT_PATH,
} from "./constants/routes";
import Paper from "./pages/students/Paper";
import CreatePaper from "./pages/admin/paper/CreatePaper";
import ManagePaper from "./pages/admin/paper/ManagePaper";
import CreateLesson from "./pages/admin/lesson/CreateLesson";
import ManageLesson from "./pages/admin/lesson/ManageLesson";
import CreateQuestion from "./pages/admin/question/CreateQuestion";
import MCQAll from "./pages/MCQAll";
import MCQStart from "./pages/MCQStart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import "./styles/custom-styles.css";
import ManageQuestion from "./pages/admin/question/ManageQuestion";
import Dashboard from "./pages/admin/Dashboard";
import Mark from "./pages/students/Mark";
import BuyPaper from "./pages/students/BuyPaper";
import PaymentSuccess from "./pages/students/PaymentSuccess";
import Profile from "./pages/students/Profile";
import PurchasingHistory from "./pages/students/PurchasingHistory";
import MyResults from "./pages/students/MyResults";
import { auth_token, isAdmin, isStudent } from "./auth/auth";
import AllUsers from "./pages/admin/reports/AllUsers";
import AllPayments from "./pages/admin/reports/AllPayments";

function App() {
  // Create a private route for passengers
  const StudentRoute = () => {
    return auth_token() && isStudent() ? <Outlet /> : <Navigate to="/login" />;
  };

  // Create a private route for admins
  const AdminRoute = () => {
    return auth_token() && isAdmin() ? <Outlet /> : <Navigate to="/login" />;
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    return <Navigate to={LOGIN_PATH} />;
  };

  const LoginRoute = () => {
    return auth_token() ? (
      isAdmin() ? (
        <Navigate to={ADMIN_DASHBOARD_PATH} />
      ) : isStudent() ? (
        <Navigate to={HOME_PATH} />
      ) : (
        handleLogout()
      )
    ) : (
      <Outlet />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={LOGIN_PATH} element={<LoginRoute />}>
          <Route exact path={LOGIN_PATH} element={<Login />} />
        </Route>
        <Route exact path={REGISTER_PATH} element={<LoginRoute />}>
          <Route exact path={REGISTER_PATH} element={<SignUp />} />
        </Route>

        <Route path={HOME_PATH} exact element={<MCQAll />} />
        <Route path={MCQ_PAPER_PATH} exact element={<MCQStart />} />

        <Route exact path={MCQ_EXAM_PATH} element={<StudentRoute />}>
          <Route path={MCQ_EXAM_PATH} exact element={<Paper />} />
        </Route>

        <Route exact path={MCQ_EXAM_MARK_PATH} element={<StudentRoute />}>
          <Route path={MCQ_EXAM_MARK_PATH} exact element={<Mark />} />
        </Route>

        <Route exact path={MCQ_BUY_PAPER_PATH} element={<StudentRoute />}>
          <Route path={MCQ_BUY_PAPER_PATH} exact element={<BuyPaper />} />
        </Route>

        <Route exact path={PAYMENT_SUCCESS_PATH} element={<StudentRoute />}>
          <Route
            path={PAYMENT_SUCCESS_PATH}
            exact
            element={<PaymentSuccess />}
          />
        </Route>

        <Route exact path={ADMIN_DASHBOARD_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_DASHBOARD_PATH} exact element={<Dashboard />} />
        </Route>

        <Route exact path={ADMIN_PAPER_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_PAPER_CREATE_PATH}
            exact
            element={<CreatePaper />}
          />
        </Route>

        <Route exact path={ADMIN_PAPER_EDIT_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_PAPER_EDIT_PATH} exact element={<CreatePaper />} />
        </Route>

        <Route exact path={ADMIN_PAPER_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_PAPER_MANAGE_PATH}
            exact
            element={<ManagePaper />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_CREATE_PATH}
            exact
            element={<CreateLesson />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_EDIT_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_EDIT_PATH}
            exact
            element={<CreateLesson />}
          />
        </Route>

        <Route exact path={ADMIN_LESSON_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_LESSON_MANAGE_PATH}
            exact
            element={<ManageLesson />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_CREATE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_CREATE_PATH}
            exact
            element={<CreateQuestion />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_EDIT_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_EDIT_PATH}
            exact
            element={<CreateQuestion />}
          />
        </Route>

        <Route exact path={ADMIN_QUESTION_MANAGE_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_QUESTION_MANAGE_PATH}
            exact
            element={<ManageQuestion />}
          />
        </Route>

        <Route exact path={MY_PROFILE_PATH} element={<StudentRoute />}>
          <Route path={MY_PROFILE_PATH} exact element={<Profile />} />
        </Route>
        <Route
          exact
          path={MY_PURCHASING_HISTORY_PATH}
          element={<StudentRoute />}
        >
          <Route
            path={MY_PURCHASING_HISTORY_PATH}
            exact
            element={<PurchasingHistory />}
          />
        </Route>

        <Route exact path={MY_RESULTS_PATH} element={<StudentRoute />}>
          <Route path={MY_RESULTS_PATH} exact element={<MyResults />} />
        </Route>

        <Route exact path={ADMIN_ALL_USERS_PATH} element={<AdminRoute />}>
          <Route path={ADMIN_ALL_USERS_PATH} exact element={<AllUsers />} />
        </Route>

        <Route exact path={ADMIN_ALL_PAYMENTS_PATH} element={<AdminRoute />}>
          <Route
            path={ADMIN_ALL_PAYMENTS_PATH}
            exact
            element={<AllPayments />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
