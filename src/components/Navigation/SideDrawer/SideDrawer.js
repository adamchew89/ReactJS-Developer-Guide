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
  const { open, closed } = props;
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  open: PropTypes.bool,
  closed: PropTypes.func
};

SideDrawer.defaultProps = { open: true, closed: () => {} };

export default SideDrawer;
