import React, { Component } from "react";
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/contactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/spinner";
import * as actions from "../../store/actions/order";

class Checkout extends Component {
  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinue = () => {
    this.props.history.replace("/Checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      //! Check this One Its not Redirect to the Home Page
      const routeToHome = this.props.purchased ? <Redirect to="/" /> : null;

      summary = (
        <div>
          {/* {routeToHome} */}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelled}
            checkoutContinue={this.checkoutContinue}
          />
          {/* //! we will render Contact Data Component after the CheckSummary  */}
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return <div>{summary}</div>;
  }
}

const mapStateToProps = state => {
  console.log("#CheckOut state", state);
  return {
    ings: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalPrice,
    purchased: state.orderReducer.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
