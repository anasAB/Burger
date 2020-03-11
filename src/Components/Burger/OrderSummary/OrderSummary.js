import React, { Component } from "react";
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Buttons/button";

//This Component will contains the User Order
class OrderSummary extends Component {
  componentWillUpdate() {
    // console.log("Order Summary Updated!");
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      ingkey => {
        return (
          <li key={ingkey}>
            <span style={{ textTransform: "capitalize" }}>{ingkey}</span>
            {this.props.ingredients[ingkey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>Your Burger Comes with the following ingredients</p>
        <ul>{ingredientsSummary}</ul>
        <strong>Price: {this.props.totalPrice}</strong>
        <hr />
        <Button btnType="Danger" clicked={this.props.closeOrderSummary}>
          Close :(
        </Button>

        <Button btnType="Success" clicked={this.props.continue}>
          Continue :){" "}
        </Button>

        <p>Continue To Check Out?</p>
      </Aux>
    );
  }
}

export default OrderSummary;
