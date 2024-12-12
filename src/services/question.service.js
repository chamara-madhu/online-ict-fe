import ApiIndex from "../api";

const questionService = () => ({
  getAllQuestions: (query) => ApiIndex.QuestionApi.getAllQuestions(query),
  createQuestion: (data) => ApiIndex.QuestionApi.createQuestion(data),
  getQuestionById: (id) => ApiIndex.QuestionApi.getQuestionById(id),
  updateQuestion: (id, data) => ApiIndex.QuestionApi.updateQuestion(id, data),
  getAllQuestionsByPaperId: (paperId) =>
    ApiIndex.QuestionApi.getAllQuestionsByPaperId(paperId),
  deleteQuestion: (paperId) => ApiIndex.QuestionApi.deleteQuestion(paperId),
});

export default questionService;
