// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Toolbar.module.css";
// Components
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => {
  const { drawerToggleClicked, isAuthenticated } = props;
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuthenticated} />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

Toolbar.defaultProps = {
  isAuthenticated: false
};

export default Toolbar;
