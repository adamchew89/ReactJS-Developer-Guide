// Libraries
import React, { Fragment } from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./SideDrawer.module.css";
// Images
import Logo from "../../Logo/Logo";
// Components
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = props => {
  const { open, closed, isAuthenticated } = props;
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")} onClick={closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool,
  isAuthenticated: PropTypes.bool
};

SideDrawer.defaultProps = {
  open: true,
  isAuthenticated: false
};

export default SideDrawer;
