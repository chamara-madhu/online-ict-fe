import axios from "./base";

const getMarksByMarkId = async (markId) => {
  return await axios.get(`/marks/${markId}`);
};

const getHighestMarkStudentsByPaperId = async (paperId) => {
  return await axios.get(`/marks/highest/${paperId}`);
};

export default {
  getMarksByMarkId,
  getHighestMarkStudentsByPaperId,
};
