import * as actionType from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case action.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionType.PURCHASE_BURGER_SUCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionType.PURCHASE_BURGER_FAIL:
      return {
        loading: true
      };
    case actionType.FETCH_ORDER_START:
      return {
        ...state,
        loading: true
      };
    case actionType.FETCH_ORDER_SUCCESS:
      console.log(action.orders);
      return {
        ...state,
        orders: action.orders,
        loading: false
      };
    case actionType.FETCH_ORDER_FAIL:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default reducer;
