import authApi from "./auth.api";
import lessonApi from "./lesson.api";
import paperApi from "./paper.api";
import questionApi from "./question.api";
import markApi from "./mark.api";
import paymentApi from "./payment.api";
import userApi from "./user.api";
import dashboardApi from "./dashboard.api";

export default {
  AuthApi: authApi,
  PaperApi: paperApi,
  LessonApi: lessonApi,
  QuestionApi: questionApi,
  MarkApi: markApi,
  PaymentApi: paymentApi,
  UserApi: userApi,
  DashboardApi: dashboardApi,
};
