// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Button.module.css";

const Button = props => {
  const { children, clicked, btnType, disabled } = props;
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  btnType: PropTypes.string,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  clicked: () => {},
  btnType: "Danger",
  disabled: false
};

export default Button;
