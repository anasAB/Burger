import React, { Component } from "react";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Layout from "./Containers/Layout/Layout";
import Checkout from "./Containers/Checkout/checkout";
import { Route, Switch, withRouter } from "react-router-dom";
import Orders from "./Containers/Orders/Orders";
import Auth from "./Containers/Auth/Auth";
import logOut from "./Containers/Auth/LogOut/logOut";
import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/Auth" exact component={Auth} />
            <Route path="/logOut" exact component={logOut} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
