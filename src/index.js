import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerReducer from "./store/reducers/BurgerBuilder";
import orderReducer from "./store/reducers/order";
import thunk from "redux-thunk";

//! Middleware
// const logger = store => {
//   return next => {
//     return action => {
//       console.log("[Middleware]", action);
//       const resutlOfTheNextAction = next(action);
//       console.log("after the Next", store.getState());
//       return resutlOfTheNextAction;
//     };
//   };
// };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

const enhancer = composeEnhancers(
  applyMiddleware(
    // logger,
    thunk
  )
  // other store enhancers if any
);

const rootReducers = combineReducers({
  burgerbuilder: burgerReducer,
  orderReducer: orderReducer
});

const store = createStore(rootReducers, enhancer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
