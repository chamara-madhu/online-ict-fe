import axios from "./base";

const createPaper = async (data) => {
  return await axios.post("/papers", data);
};

const getAllPapers = async (query = "") => {
  return await axios.get(`/papers?${query}`);
};

const getPaperById = async (id) => {
  return await axios.get(`/papers/${id}`);
};

const updatePaper = async (id, data) => {
  return await axios.put(`/papers/${id}`, data);
};

const deletePaper = async (id) => {
  return await axios.delete(`/papers/${id}`);
};

const markPaper = async (id, answers) => {
  return await axios.post(`/papers/marks/${id}`, { answers });
};

export default {
  createPaper,
  getAllPapers,
  getPaperById,
  updatePaper,
  deletePaper,
  markPaper,
};
