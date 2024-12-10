import PropTypes from "prop-types";

const FormTextarea = ({
  name,
  label,
  value,
  error,
  rows = 5,
  placeholder,
  isRequired,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {isRequired ? "*" : null}
      </label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

FormTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  rows: PropTypes.number,
};

export default FormTextarea;
