import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Buttons/button";
import "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className="CheckoutSummary">
      <h1>We Hope it's Tastes Good :) </h1>

      <div style={{ width: "100%", margin: "auto" }}>
        <p>Burger</p>
        <Burger ingredients={props.ingredients} totalPrice={props.totalPrice} />
      </div>

      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        Cancel :(
      </Button>

      <Button btnType="Success" clicked={props.checkoutContinue}>
        Continue :)
      </Button>
    </div>
  );
};

export default checkoutSummary;
