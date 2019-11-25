// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Backdrop.module.css";

const Backdrop = props => {
  const { show, clicked } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked}>Backdrop</div> : null;
};

Backdrop.propTypes = {
  clicked: PropTypes.func,
  show: PropTypes.bool
};

Backdrop.defaultProps = {
  clicked: () => {},
  show: false
};

export default Backdrop;
