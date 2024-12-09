import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../../../shared/fields/FormInput";
import {
  EXAM_OPTIONS,
  FEE_OPTIONS,
  MEDIUM_OPTIONS,
  TYPE_OPTIONS,
} from "../../../../constants/base";
import paperService from "../../../../services/paper.service";
import Button from "../../../shared/buttons/Button";
import PageHeader from "../../../shared/headers/PageHeader";
import TypeOrSelect from "../../../shared/fields/TypeOrSelect";

const initialState = {
  exam: "",
  medium: "",
  type: "",
  fee: "",
  year: "",
  longName: "",
  stats: {
    noOfStuds: "",
    a: "",
    b: "",
    c: "",
    s: "",
    f: "",
  },
};

const CreatePaperMain = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { createPaper } = paperService();

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

  const handleStats = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      stats: {
        ...prevForm.stats,
        [name]: value,
      },
    }));
  }, []);

  const isValid = () => {
    let exam = "";
    let medium = "";
    let type = "";
    let fee = "";
    let year = "";
    let longName = "";

    // Validate Exam
    if (!form.exam) {
      exam = "Exam is required";
    }

    // Validate Medium
    if (!form.medium) {
      medium = "Medium is required";
    }

    // Validate Type
    if (!form.type) {
      type = "Type is required";
    }

    // Validate Fee
    if (!form.fee) {
      fee = "Fee is required";
    }

    // Validate Year
    if (
      !form.year ||
      isNaN(form.year) ||
      form.year < 2010 ||
      form.year > new Date().getFullYear()
    ) {
      year = "Valid year is required";
    }

    // Validate Long name
    if (!form.longName || form.longName.trim() === "") {
      longName = "Long name is required";
    }

    // Check if any error exists
    if (exam || medium || type || fee || year || longName) {
      setErrors((prev) => ({
        ...prev,
        exam,
        medium,
        type,
        fee,
        year,
        longName,
      }));

      return false;
    }

    // If no errors, return true
    return true;
  };

  const handleCreatePaper = async (e) => {
    e.preventDefault();
    if (!isValid()) return;

    setLoading(true);

    try {
      await createPaper(form);
      toast.success("Paper successfully created");
      handleReset();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors(initialState);
  };

  return (
    <>
      <PageHeader title="Create paper" />
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
          <TypeOrSelect
            isClearable
            label="Medium"
            name="medium"
            onChange={handleChange}
            options={MEDIUM_OPTIONS}
            value={form.medium}
            placeholder="Eg. English"
            error={errors.medium}
            showRequiredLabel
          />
          <TypeOrSelect
            isClearable
            label="Type"
            name="type"
            onChange={handleChange}
            options={TYPE_OPTIONS}
            value={form.type}
            placeholder="Eg. Past"
            error={errors.type}
            showRequiredLabel
          />
          <TypeOrSelect
            isClearable
            label="Fee"
            name="fee"
            onChange={handleChange}
            options={FEE_OPTIONS}
            value={form.fee}
            placeholder="Eg. Paid"
            error={errors.fee}
            showRequiredLabel
          />
          <FormInput
            type="number"
            name="year"
            label="Year"
            value={form.year}
            onChange={handleChange}
            placeholder="Eg. 2024"
            isRequired
            error={errors.year}
          />
          <FormInput
            name="longName"
            label="Long name"
            value={form.longName}
            onChange={handleChange}
            placeholder="Eg. G.C.E Advanced Level - 2024 (English)"
            isRequired
            error={errors.longName}
          />
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Statistics</label>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">
                No of students
              </div>
              <FormInput
                type="number"
                name="noOfStuds"
                value={form?.stats?.noOfStuds}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">A</div>
              <FormInput
                type="number"
                name="a"
                value={form?.stats?.a}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">B</div>
              <FormInput
                type="number"
                name="b"
                value={form?.stats?.b}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">C</div>
              <FormInput
                type="number"
                name="c"
                value={form?.stats?.c}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">S</div>
              <FormInput
                type="number"
                name="s"
                value={form?.stats?.s}
                onChange={handleStats}
                isRequired
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[101px] text-right font-medium text-sm">F</div>
              <FormInput
                type="number"
                name="f"
                value={form?.stats?.f}
                onChange={handleStats}
                isRequired
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              label="Submit"
              isLoading={loading}
              handleBtn={handleCreatePaper}
            />
            <Button label="Reset" color="secondary" handleBtn={handleReset} />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePaperMain;
