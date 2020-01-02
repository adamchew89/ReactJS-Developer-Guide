// Libraries
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// CSS
import classes from "./Layout.module.css";
// Components
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

export class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () =>
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render() {
    const { showSideDrawer } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuthenticated={isAuthenticated}
        />
        <SideDrawer
          closed={this.sideDrawerToggleHandler}
          open={showSideDrawer}
          isAuthenticated={isAuthenticated}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool
};

Layout.defaultProps = {
  isAuthenticated: false
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken !== null
});

export default connect(mapStateToProps)(Layout);
