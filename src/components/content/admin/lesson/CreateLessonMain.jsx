import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../shared/fields/FormInput";
import { EXAM_OPTIONS } from "../../../../constants/base";
import lessonService from "../../../../services/lesson.service";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";
import Button from "../../../shared/buttons/Button";

const initialState = {
  exam: "",
  no: "",
  lesson: "",
};

const CreateLessonMain = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { createLesson } = lessonService();

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

  const isValid = () => {
    let exam = "";
    let no = "";
    let lesson = "";

    // Validate Exam
    if (!form.exam) {
      exam = "Exam is required";
    }

    // Validate Medium
    if (!form.no) {
      no = "Lesson number is required";
    }

    // Validate Type
    if (!form.lesson) {
      lesson = "Lesson name is required";
    }

    // Check if any error exists
    if (exam || no || lesson) {
      setErrors((prev) => ({
        ...prev,
        exam,
        no,
        lesson,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      await createLesson(form);
      toast.success("Lesson successfully created");
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
  };

  return (
    <div>
      <form className="flex w-[50%] flex-col gap-6">
        <TypeOrSelect
          isClearable
          label="Exam"
          name="exam"
          onChange={handleChange}
          options={EXAM_OPTIONS}
          value={form.exam}
          placeholder="Eg. A/L"
          error={errors.exam}
          showRequiredLabel
        />
        <FormInput
          type="number"
          name="no"
          value={form.no}
          label="Lesson number"
          onChange={handleChange}
          placeholder="Eg. 1"
          isRequired
          error={errors.no}
        />
        <FormInput
          name="lesson"
          label="Lesson"
          value={form.lesson}
          onChange={handleChange}
          placeholder="Eg. Concept of ICT"
          isRequired
          error={errors.lesson}
        />
        <div className="flex gap-2">
          <Button
            label="Submit"
            isLoading={loading}
            handleBtn={handleCreateLesson}
          />
          <Button label="Reset" color="secondary" handleBtn={handleReset} />
        </div>
      </form>
    </div>
  );
};

export default CreateLessonMain;
