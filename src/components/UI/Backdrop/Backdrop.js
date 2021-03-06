// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Backdrop.module.css";

const Backdrop = props => {
  const { show, clicked } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null;
};

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
  show: PropTypes.bool
};

Backdrop.defaultProps = {
  show: false
};

export default Backdrop;
