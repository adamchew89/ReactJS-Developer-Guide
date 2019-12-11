// Libraries
import React, { Component } from "react";
import PropTypes from "prop-types";
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
    const { fetchOrders, idToken } = this.props;
    fetchOrders(idToken);
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
  orders: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  idToken: PropTypes.string
};

Orders.defaultProps = { loading: false, idToken: null };

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    idToken: state.auth.idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: idToken => dispatch(OrderActionCreator.fetchOrders(idToken))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
