/* eslint-disable indent */
import { setLocale } from "yup";

setLocale({
  mixed: {
    notType: _ref => {
      switch (_ref.type) {
        case "number":
          return "Must be a number";
        default:
          return "Invalid data";
      }
    },
    default: "Invalid value",
    required: "Required field",
  },
  string: {
    email: "Must be a valid email",
    max: ({ max }) => `Must contain no more than ${max} characters`,
    min: ({ min }) => `Must contain at least ${min} characters`,
    length: ({ length }) => `Must be exactly ${length} characters`,
  },
  number: {
    integer: "Must be an integer",
    negative: () => "Must be negative",
    positive: () => "Must be positive",
    moreThan: ({ more }) => `Must be greater than ${more}`,
    lessThan: ({ less }) => `Must be less than ${less}`,
  },
});
