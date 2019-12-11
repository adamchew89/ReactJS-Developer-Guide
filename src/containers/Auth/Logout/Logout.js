// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// CSS
// ActionCreators
import * as AuthActionCreator from "../../../stores/actions/auth-action";
// Containers
// Components

class Logout extends Component {
  componentDidMount() {
    const { onLogout } = this.props;
    onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

Logout.propTypes = { onLogout: PropTypes.func };

Logout.defaultProps = { onLogout: () => {} };

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(AuthActionCreator.authLogout())
});

export default connect(null, mapDispatchToProps)(Logout);
