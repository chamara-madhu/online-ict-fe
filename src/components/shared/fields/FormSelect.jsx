import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import Select from "react-select";

const FormSelect = ({
  name,
  label,
  control,
  options,
  errors,
  placeholder,
  isMulti,
  isRequired,
  ...rest
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 required"
      >
        {label} {isRequired ? "*" : null}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            isMulti={isMulti}
            options={options}
            inputRef={ref}
            value={
              isMulti
                ? options.filter(
                    (c) =>
                      value &&
                      value.find((item) => item === c.value) !== undefined
                  )
                : options.find((option) => option.value === value)
            }
            onChange={(val) =>
              isMulti
                ? onChange(val.map((item) => item.value))
                : onChange(val.value)
            }
            placeholder={placeholder}
            className={`w-full text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-transparent ${
              errors[name] ? "border-red-500" : ""
            }`}
            {...rest}
          />
        )}
      />
      {errors[name] && (
        <p className="text-sm text-red-400">{errors[name]?.message}</p>
      )}
    </div>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  errors: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
};

export default FormSelect;
