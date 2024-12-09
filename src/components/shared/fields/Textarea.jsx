import React, { useState, useMemo, forwardRef } from "react";
import classnames from "classnames";

const Textarea = forwardRef(
  (
    {
      label,
      name,
      value,
      handleChange,
      preValue,
      labelClass,
      inputClass,
      className,
      iconLeft,
      iconRight,
      showRequiredLabel = false,
      isDisabled = false,
      placeholder,
      error,
      info,
      rows = 3,
    },
    ref
  ) => {
    const [isFocus, setIsFocus] = useState(false);

    const focusClass = useMemo(
      () => (isFocus ? `border-purple-300 shadow-xs-focused-purple-100` : ""),
      [isFocus]
    );

    return (
      <div className={classnames("flex w-full flex-col gap-1.5", className)}>
        <label
          className={classnames(
            "text-sm font-medium text-gray-700",
            labelClass
          )}
        >
          {label} {showRequiredLabel ? "*" : null}
        </label>
        <div
          className={classnames(
            "flex relative outline-none w-full bg-white border rounded-lg shadow-xs",
            focusClass,
            inputClass,
            error ? "border-red-500" : "border-gray-300"
          )}
        >
          {preValue && (
            <span className="inline-flex items-center px-3.5 py-2.5 text-sm text-gray-600 border-0 border-r">
              {preValue}
            </span>
          )}
          {iconLeft && (
            <span className="inline-flex items-center pl-3.5 py-2.5">
              {iconLeft}
            </span>
          )}
          <textarea
            ref={ref}
            name={name}
            value={value}
            className="w-full h-full p-3 rounded-lg outline-none placeholder:text-gray-500"
            onFocusCapture={() => setIsFocus(true)}
            onBlurCapture={() => setIsFocus(false)}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={isDisabled}
            rows={rows}
          />
          {iconRight}
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {info && <p className="text-xs text-gray-600">{info}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
