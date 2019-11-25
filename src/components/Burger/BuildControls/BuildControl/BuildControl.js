// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./BuildControl.module.css";

const BuildControl = props => {
  const { disabled, added, removed } = props;
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less} onClick={removed} disabled={disabled}>
        Less
      </button>
      <button className={classes.More} onClick={added}>
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

BuildControl.defaultProps = {
  disabled: true
};

export default BuildControl;
