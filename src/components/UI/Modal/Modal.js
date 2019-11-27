// Libraries
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Modal.module.css";
// Components
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Updates only if Modal is shown in UI
    const { show, children } = this.props;
    return show !== nextProps.show || nextProps.children !== children;
  }

  render() {
    const { show, modalClose, children } = this.props;
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
          {children}
        </div>
      </Fragment>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  modalClose: PropTypes.func,
  children: PropTypes.object
};

Modal.defaultProps = {
  show: false,
  modalClose: () => {},
  children: {}
};

export default Modal;
