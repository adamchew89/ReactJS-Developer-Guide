// Libraries
import React, { Component } from "react";
// CSS
// Actions
// Containers
// Components

const asyncComponent = importComponent =>
  class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then(cmp => this.setState({ component: cmp.default }));
    }

    render() {
      const { component } = this.state;
      const C = component;
      return C ? <C {...this.props} /> : null;
    }
  };
asyncComponent.propTypes = {};

asyncComponent.defaultProps = {};

export default asyncComponent;
