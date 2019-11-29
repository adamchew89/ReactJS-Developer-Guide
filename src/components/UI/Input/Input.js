// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Input.module.css";
// Actions
// Containers
// Components

const Input = props => {
  const { elementConfig, elementType, value, changed } = props;
  let inputEl = null;
  switch (elementType) {
    case "input":
      inputEl = (
        <input
          className={classes.InputEl}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "textarea":
      inputEl = (
        <textarea
          className={classes.InputEl}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputEl = (
        <select className={classes.InputEl} value={value} onChange={changed}>
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
          className={classes.InputEl}
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
  changed: PropTypes.func,
  elementConfig: PropTypes.object,
  elementType: PropTypes.string,
  value: PropTypes.string
};

Input.defaultProps = {
  changed: () => {},
  elementConfig: {},
  elementType: "",
  value: ""
};

export default Input;
