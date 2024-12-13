import ApiIndex from "../api";

const paperService = () => ({
  createPaper: (data) => ApiIndex.PaperApi.createPaper(data),
  getAllPapers: (query) => ApiIndex.PaperApi.getAllPapers(query),
  getPaperById: (id) => ApiIndex.PaperApi.getPaperById(id),
  updatePaper: (id, data) => ApiIndex.PaperApi.updatePaper(id, data),
  deletePaper: (id) => ApiIndex.PaperApi.deletePaper(id),
  markPaper: (id, answers) => ApiIndex.PaperApi.markPaper(id, answers),
  checkEligibility: (id) => ApiIndex.PaperApi.checkEligibility(id),
});

export default paperService;
