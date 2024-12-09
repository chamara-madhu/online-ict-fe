import axios from "./base";

const getAllLessons = async (query = "") => {
  return await axios.get(`/lessons?${query}`);
};

const getAllLessonsByPaperId = async (paperId) => {
  return await axios.get(`/lessons/by-paper/${paperId}`);
};

const createLesson = async (data) => {
  return await axios.post("/lessons", data);
};

const deleteLesson = async (id) => {
  return await axios.delete(`/lessons/${id}`);
};

export default {
  getAllLessons,
  createLesson,
  getAllLessonsByPaperId,
  deleteLesson,
};
