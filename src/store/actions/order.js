import * as actionTypes from "./actionTypes";
import axios from "../../axios.oreder";

export const purchaseBurger = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = (orderData, token) => {
  return dispatch => {
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurger(response.data));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchased = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

//!Fetch the Orders from DB

export const fetchSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders
  };
};

export const fetchOrderFail = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const fetchOrder = token => {
  return dispatch => {
    axios
      .get("/orders.json?auth=" + token)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrderFail(err));
      });
  };
};
