// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
// ActionCreators
import * as AuthActionCreator from "./stores/actions/auth-action";
// HOCs
import Layout from "./hocs/Layout/Layout";
// Containers
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignIn } = this.props;
    onTryAutoSignIn();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = [
      <Route key="/auth" path="/auth" component={Auth} />,
      <Route key="/" path="/" exact component={BurgerBuilder} />,
      <Redirect to="/" />
    ];
    if (isAuthenticated) {
      routes = [
        <Route key="/checkout" path="/checkout" component={Checkout} />,
        <Route key="/orders/" path="/orders" component={Orders} />,
        <Route key="/logout" path="/logout" component={Logout} />
      ];
    }

    return (
      <Layout>
        <Switch>{routes}</Switch>
      </Layout>
    );
  }
}

App.propTypes = {
  onTryAutoSignIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

App.defaultProps = { isAuthenticated: false };

const mapStateToProps = state => ({
  isAuthenticated: state.auth.idToken !== null
});

const mapDispatchToProps = dispatch => ({
  onTryAutoSignIn: () => dispatch(AuthActionCreator.authCheckState())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
