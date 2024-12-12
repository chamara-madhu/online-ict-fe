import axios from "./base";

const getAllQuestions = async (query = "") => {
  return await axios.get(`/questions?${query}`);
};

const getQuestionById = async (id) => {
  return await axios.get(`/questions/${id}`);
};

const getAllQuestionsByPaperId = async (paperId) => {
  return await axios.get(`/questions/by-papers/${paperId}`);
};

const createQuestion = async (data) => {
  return await axios.post("/questions", data);
};

const updateQuestion = async (id, data) => {
  return await axios.put(`/questions/${id}`, data);
};

const deleteQuestion = async (paperId) => {
  return await axios.delete(`/questions/${paperId}`);
};

export default {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  getQuestionById,
  getAllQuestionsByPaperId,
  deleteQuestion,
};
