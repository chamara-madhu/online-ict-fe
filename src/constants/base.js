// User roles
export const USER_ROLES = {
  ADMIN: 0,
  STUDENT: 1,
};

export const EXAMS = {
  AL: "A/L",
  OL: "O/L",
};

export const MEDIUMS = {
  ENGLISH: "English",
  SINHALA: "Sinhala",
};

export const TYPES = {
  PAST: "Past",
  MODEL: "Model",
};

export const FEES = {
  FREE: "Free",
  PAID: "Paid",
};

export const QUESTION_TYPES = {
  MCQ: "MCQ",
};

export const QUESTION_DIFFICULTY_TYPES = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

export const QUESTION_NUMBERS = {
  ONE: "1",
  TWO: "2",
  THREE: "3",
  FOUR: "4",
  FIVE: "5",
};

// medals
export const MEDALS = {
  GOLD: 1,
  SILVER: 2,
  BRONZE: 3,
};

// paper price
export const PRICE_PER_PAPER = 200;
export const PROMOTION_RATE = 0.5;
export const CURRENCY = "LKR";

export const EXAM_OPTIONS = Object.keys(EXAMS).map((key) => {
  return {
    value: EXAMS[key],
    label: EXAMS[key],
  };
});

export const MEDIUM_OPTIONS = Object.keys(MEDIUMS).map((key) => {
  return {
    value: MEDIUMS[key],
    label: MEDIUMS[key],
  };
});

export const TYPE_OPTIONS = Object.keys(TYPES).map((key) => {
  return {
    value: TYPES[key],
    label: TYPES[key],
  };
});

export const FEE_OPTIONS = Object.keys(FEES).map((key) => {
  return {
    value: FEES[key],
    label: FEES[key],
  };
});

export const QUESTION_TYPES_OPTIONS = Object.keys(QUESTION_TYPES).map((key) => {
  return {
    value: QUESTION_TYPES[key],
    label: QUESTION_TYPES[key],
  };
});

export const QUESTION_DIFFICULTY_TYPES_OPTIONS = Object.keys(
  QUESTION_DIFFICULTY_TYPES
).map((key) => {
  return {
    value: QUESTION_DIFFICULTY_TYPES[key],
    label: QUESTION_DIFFICULTY_TYPES[key],
  };
});

export const QUESTION_NUMBERS_OPTIONS = Object.keys(QUESTION_NUMBERS).map(
  (key) => {
    return {
      value: QUESTION_NUMBERS[key],
      label: QUESTION_NUMBERS[key],
    };
  }
);
