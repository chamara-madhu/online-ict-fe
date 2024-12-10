import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  // MCQ_DYNAMIC_PAPER_EXAM_PATH,
  MCQ_EXAM_PATH,
  MCQ_PAPER_PATH,
  PAYMENT_SUCCESS_PATH,
  MY_PROFILE_PATH,
  MY_PURCHASING_HISTORY_PATH,
  // PAPER_PATH,
  REGISTER_PATH,
  MY_RESULTS_PATH,
} from "./constants/routes";
// import Home from "./pages/Home";
import Paper from "./pages/Paper";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PATH} exact element={<Login />} />
        <Route path={REGISTER_PATH} exact element={<SignUp />} />

        <Route path={HOME_PATH} exact element={<MCQAll />} />
        <Route path={MCQ_PAPER_PATH} exact element={<MCQStart />} />

        <Route path={MCQ_EXAM_PATH} exact element={<Paper />} />
        <Route path={MCQ_EXAM_MARK_PATH} exact element={<Mark />} />
        <Route path={MCQ_BUY_PAPER_PATH} exact element={<BuyPaper />} />
        <Route path={PAYMENT_SUCCESS_PATH} exact element={<PaymentSuccess />} />

        <Route path={ADMIN_DASHBOARD_PATH} exact element={<Dashboard />} />
        <Route path={ADMIN_PAPER_CREATE_PATH} exact element={<CreatePaper />} />
        <Route path={ADMIN_PAPER_MANAGE_PATH} exact element={<ManagePaper />} />
        <Route
          path={ADMIN_LESSON_CREATE_PATH}
          exact
          element={<CreateLesson />}
        />
        <Route
          path={ADMIN_LESSON_MANAGE_PATH}
          exact
          element={<ManageLesson />}
        />
        <Route
          path={ADMIN_QUESTION_CREATE_PATH}
          exact
          element={<CreateQuestion />}
        />
        <Route
          path={ADMIN_QUESTION_MANAGE_PATH}
          exact
          element={<ManageQuestion />}
        />

        <Route path={MY_PROFILE_PATH} exact element={<Profile />} />
        <Route
          path={MY_PURCHASING_HISTORY_PATH}
          exact
          element={<PurchasingHistory />}
        />
        <Route path={MY_RESULTS_PATH} exact element={<MyResults />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
