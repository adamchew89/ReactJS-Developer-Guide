// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Actions
import axios from "../../actions/axios-orders";
// HOCs
import withErrorHandler from "../../hocs/withErrorHandler/withErrorHandler";
// Components
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
// ActionCreators
import * as OrderActionCreator from "../../stores/actions/order-action";

export class Orders extends Component {
  componentDidMount() {
    const { fetchOrders, idToken, userId } = this.props;
    fetchOrders(idToken, userId);
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

Orders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  idToken: PropTypes.string,
  userId: PropTypes.string
};

Orders.defaultProps = { loading: false, idToken: null, userId: null };

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  idToken: state.auth.idToken,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (idToken, userId) =>
    dispatch(OrderActionCreator.fetchOrders(idToken, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
