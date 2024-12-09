import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import {
  QUESTION_TYPES_OPTIONS,
  QUESTION_DIFFICULTY_TYPES_OPTIONS,
  QUESTION_NUMBERS_OPTIONS,
  QUESTION_DIFFICULTY_TYPES,
  QUESTION_TYPES,
} from "../../../../constants/base";
import FormTextarea from "../../../shared/fields/FormTextarea";
import FormInput from "../../../shared/fields/FormInput";
import questionService from "../../../../services/question.service";
import paperService from "../../../../services/paper.service";
import lessonService from "../../../../services/lesson.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";

const initialState = {
  type: "",
  no: "",
  paperId: "",
  lessonId: "",
  question: "",
  image: "",
  restOfQuestion: "",
  options: [],
  answer: [5],
  difficulty: "",
};

const CreateQuestionMain = () => {
  const [papers, setPapers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { getAllPapers } = paperService();
  const { getAllLessonsByPaperId } = lessonService();
  const { createQuestion } = questionService();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }, []);

  useEffect(() => {
    const fetchAllPapers = async () => {
      try {
        const res = await getAllPapers();
        const mapped = res?.data?.map((paper) => ({
          value: paper._id,
          label: `${paper.exam} ${paper.medium} ${paper.year} (${paper.type})`,
        }));
        setPapers(mapped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPapers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        if (!form.paperId) return;

        const response = await getAllLessonsByPaperId(form.paperId);
        const mappedLessons = response?.map((lesson) => ({
          value: lesson._id,
          label: `${lesson.no}. ${lesson.lesson}`,
        }));
        setLessons(mappedLessons);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.paperId]);

  // console.log({ paperId });

  const isValid = () => {
    let type = "";
    let no = "";
    let paperId = "";
    let lessonId = "";
    let question = "";
    let options = "";
    let answer = "";
    let difficulty = "";

    // Validate Exam
    if (!form.type) {
      type = "Exam is required";
    }

    // Validate Medium
    if (!form.no) {
      no = "Question number is required";
    }

    // Validate Type
    if (!form.lessonId) {
      lessonId = "Lesson name is required";
    }

    // Validate Type
    if (!form.paperId) {
      paperId = "Paper name is required";
    }

    // Validate Type
    if (!form.question) {
      question = "Question is required";
    }

    // Validate Type
    if (form.answerOptions.length === 0) {
      options = "options is required";
    }

    // Validate Type
    if (form.answer.length === 0) {
      answer = "answer is required";
    }

    // Validate Type
    if (!form.difficulty) {
      difficulty = "Difficulty is required";
    }

    // Check if any error exists
    if (
      type ||
      no ||
      paperId ||
      lessonId ||
      question ||
      options ||
      answer ||
      difficulty
    ) {
      setErrors((prev) => ({
        ...prev,
        type,
        no,
        paperId,
        lessonId,
        question,
        options,
        answer,
        difficulty,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const appendOption = () => {
    setAnswerOptions([...answerOptions, ""]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index] = value;
    setAnswerOptions(updatedOptions);
  };

  const removeOption = (index) => {
    setAnswerOptions(answerOptions.filter((_, i) => i !== index));
  };

  const handleCreateQuestion = async (e) => {
    e.preventDefault();

    // if (!isValid()) return;
    setLoading(true);

    try {
      await createQuestion({ ...form, options: answerOptions });
      toast.success("Question successfully created");
      handleReset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors(initialState);
    setAnswerOptions([]);
  };

  return (
    <div>
      <form className="flex w-[50%] flex-col gap-6">
        <TypeOrSelect
          isClearable
          label="Type"
          name="type"
          onChange={handleChange}
          options={QUESTION_TYPES_OPTIONS}
          value={form.type}
          placeholder="Eg. MCQ"
          error={errors.type}
          showRequiredLabel
        />
        <FormInput
          name="no"
          label="Question No"
          value={form.no}
          placeholder="Eg. 1"
          onChange={handleChange}
          error={errors.no}
          isRequired
        />
        <TypeOrSelect
          isClearable
          label="Paper"
          name="paperId"
          onChange={handleChange}
          options={papers}
          value={
            papers.filter((paper) => paper.value === form.paperId)?.[0]?.label
          }
          placeholder="-- Select --"
          error={errors.paperId}
          showRequiredLabel
        />
        <TypeOrSelect
          isClearable
          label="Lesson"
          name="lessonId"
          onChange={handleChange}
          options={lessons}
          value={
            lessons.filter((lesson) => lesson.value === form.lessonId)?.[0]
              ?.label
          }
          placeholder="-- Select --"
          error={errors.lessonId}
          showRequiredLabel
        />
        <FormTextarea
          name="question"
          label="Question"
          value={form.question}
          onChange={handleChange}
          error={errors.question}
          isRequired
        />
        <FormInput
          name="image"
          label="Image URL"
          value={form.image}
          onChange={handleChange}
          error={errors.image}
        />
        <FormTextarea
          name="restOfQuestion"
          label="Rest of question"
          value={form.restOfQuestion}
          onChange={handleChange}
          error={errors.restOfQuestion}
        />
        <TypeOrSelect
          isClearable
          label="Difficulty"
          name="difficulty"
          onChange={handleChange}
          options={QUESTION_DIFFICULTY_TYPES_OPTIONS}
          value={
            QUESTION_DIFFICULTY_TYPES_OPTIONS.filter(
              (el) => el.value === form.difficulty
            )?.[0]?.label
          }
          placeholder="-- Select --"
          error={errors.difficulty}
          showRequiredLabel
        />
        <div className="flex flex-col items-start w-full gap-3">
          <div className="flex items-start justify-between w-full gap-2">
            <span className="text-sm font-medium">Answer options *</span>
          </div>

          <div className="flex flex-col w-full gap-2">
            {answerOptions?.length > 0 ? (
              answerOptions.map((option, index) => (
                <div className="flex flex-col w-full gap-1" key={index}>
                  <div className="flex items-center w-full gap-2">
                    <input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="w-full h-10 px-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300"
                    />
                    <button
                      onClick={() => removeOption(index)}
                      type="button"
                      className="text-gray-600 hover:text-red-500"
                    >
                      <FeatherIcon icon="trash" size="16" />
                    </button>
                  </div>

                  {errors?.options?.[index]?.message && (
                    <p className="text-sm text-red-400">
                      {errors.options[index].message}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-500">No options added</span>
            )}

            {/* Message for required number of options */}
            {form?.options?.length > 1 && form.options.length < 5 && (
              <p className="text-sm text-red-400">5 options are required.</p>
            )}
          </div>
          <button
            onClick={appendOption}
            type="button"
            className="flex items-center gap-2 text-sm"
          >
            <FeatherIcon icon="plus" size="16" /> Add
          </button>
        </div>

        <div className="flex gap-2">
          <Button
            label="Submit"
            isLoading={loading}
            handleBtn={handleCreateQuestion}
          />
          <Button label="Reset" color="secondary" handleBtn={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionMain;
