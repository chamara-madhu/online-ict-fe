import ApiIndex from "../api";

const paperService = () => ({
  createPaper: (data) => ApiIndex.PaperApi.createPaper(data),
  getAllPapers: (query) => ApiIndex.PaperApi.getAllPapers(query),
  getPaper: (id) => ApiIndex.PaperApi.getPaper(id),
  deletePaper: (id) => ApiIndex.PaperApi.deletePaper(id),
  markPaper: (id, answers) => ApiIndex.PaperApi.markPaper(id, answers),
});

export default paperService;
