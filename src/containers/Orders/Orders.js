// Libraries
import React, { Component } from "react";
import axios from "../../actions/axios-orders";
// HOCs
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
// Components
import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = { loading: true, orders: [] };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, orders } = this.state;
    let content = orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        totalPrice={+order.totalPrice}
      />
    ));
    if (loading) {
      content = <Spinner />;
    }
    return <div>{content}</div>;
  }
}

export default withErrorHandler(Orders, axios);
