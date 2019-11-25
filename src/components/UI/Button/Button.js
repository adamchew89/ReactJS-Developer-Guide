// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Button.module.css";

const Button = props => {
  const { children, clicked, btnType } = props;
  return (
    <button
      className={[classes.Button, classes[btnType]].join(" ")}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  btnType: PropTypes.string
};

Button.defaultProps = {
  clicked: () => {},
  btnType: "Danger"
};

export default Button;
