// Libraries
import React, { Component } from "react";
// Components
import Layout from "./components/Layout/Layout";
// Containers
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
