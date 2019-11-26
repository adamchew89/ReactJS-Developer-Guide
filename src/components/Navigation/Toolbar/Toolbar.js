// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Toolbar.module.css";
// Components
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SiderDrawer/DrawerToggle/DrawerToggle";

const Toolbar = props => {
  const { drawerToggleClicked } = props;
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func
};

Toolbar.defaultProps = {
  drawerToggleClicked: () => {}
};

export default Toolbar;
