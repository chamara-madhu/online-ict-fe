import ApiIndex from "../api";

const lessonService = () => ({
  getAllLessons: (query) => ApiIndex.LessonApi.getAllLessons(query),
  createLesson: (data) => ApiIndex.LessonApi.createLesson(data),
  getAllLessonsByPaperId: (data) =>
    ApiIndex.LessonApi.getAllLessonsByPaperId(data),
  deleteLesson: (id) => ApiIndex.LessonApi.deleteLesson(id),
});

export default lessonService;
