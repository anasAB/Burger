import React, { Component } from "react";
import Order from "../../Components/Order/Order";
import axios from "../../axios.oreder";
import Spinner from "../../Components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as orderActions from "../../store/actions/order";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
      <div>
        {this.props.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("### Get Orders", state.orderReducer.orders);
  return {
    orders: state.orderReducer.orders,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(orderActions.fetchOrder(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
