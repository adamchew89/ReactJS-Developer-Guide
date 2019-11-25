// Libraries
import React, { Fragment } from "react";
// CSS
import classes from "./Layout.css";

const Layout = props => {
  return (
    <Fragment>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.Content}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
