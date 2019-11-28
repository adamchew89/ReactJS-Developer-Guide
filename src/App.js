// Libraries
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// HOCs
import Layout from "./hocs/Layout/Layout";
// Containers
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;