import React from "react";

const Select = ({
  label,
  fieldName,
  fieldValue,
  fieldValues,
  compareField,
  defaultText,
  handleFieldChange
}) => (
  <div className="tripSorter__select--item">
    <label>
      {label}
      <select
        className="tripSorter__select--element"
        id={fieldName}
        value={fieldValue}
        onChange={handleFieldChange}
        data-testid={`${fieldName}-select`}
      >
        <option value={""}>{defaultText}</option>
        {fieldValues.map((city, i) => (
          <option
            key={`from-${i}`}
            value={city}
            disabled={city === compareField}
          >
            {city}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default Select;
