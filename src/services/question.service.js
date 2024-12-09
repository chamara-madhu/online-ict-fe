import ApiIndex from "../api";

const questionService = () => ({
  getAllQuestions: (query) => ApiIndex.QuestionApi.getAllQuestions(query),
  createQuestion: (data) => ApiIndex.QuestionApi.createQuestion(data),
  getAllQuestionsByPaperId: (paperId) =>
    ApiIndex.QuestionApi.getAllQuestionsByPaperId(paperId),
  deleteQuestion: (paperId) => ApiIndex.QuestionApi.deleteQuestion(paperId),
});

export default questionService;
