// Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
// Actions
import axios from "../../actions/axios-orders";
// HOCs
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
// Components
import Order from "../../components/Order/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
// ActionCreators
import * as OrderActionCreator from "../../stores/actions/order-actions";

class Orders extends Component {
  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders();
  }

  render() {
    const { orders, loading } = this.props;
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

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(OrderActionCreator.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
