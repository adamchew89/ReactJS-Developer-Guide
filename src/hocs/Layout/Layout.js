// Libraries
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./Layout.css";
// Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () =>
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Fragment>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerToggleHandler}
          open={showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

Layout.defaultProps = {};

export default Layout;
