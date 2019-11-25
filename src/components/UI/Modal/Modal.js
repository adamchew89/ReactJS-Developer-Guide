// Libraries
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Modal.module.css";
// Components
import Backdrop from "../Backdrop/Backdrop";

const Modal = props => {
  const { show, modalClose } = props;
  return (
    <Fragment>
      <Backdrop show={show} clicked={modalClose} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {
  show: PropTypes.bool
};

Modal.defaultProps = {
  show: false
};

export default Modal;
