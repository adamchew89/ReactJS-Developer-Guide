// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Input.module.css";
// Actions
// Containers
// Components

const Input = props => {
  const {
    elementConfig,
    elementType,
    value,
    changed,
    invalid,
    shouldValidate,
    touched
  } = props;
  let inputEl = null;
  const inputClasses = [classes.InputEl];
  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }
  switch (elementType) {
    case "input":
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEl = (
        <input
          className={inputClasses.join(" ")}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label htmlFor="" className={classes.Label}></label>
      {inputEl}
    </div>
  );
};

Input.propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.object,
  elementType: PropTypes.string,
  value: PropTypes.string,
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.bool,
  touched: PropTypes.bool
};

Input.defaultProps = {
  elementConfig: {},
  elementType: "",
  value: "",
  invalid: false,
  shouldValidate: false,
  touched: false
};

export default Input;
