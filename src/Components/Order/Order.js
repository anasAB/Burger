import React from "react";
import "./Order.css";
import Spinner from "../UI/Spinner/spinner";

const order = props => {
  const ingredients = [];
  console.log("ORDER PROPS", props);
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px"
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className="Order">
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price:{" "}
        {/* <strong>USD {Number.parseFloat(props.totalPrice).toFixed(2)}</strong> */}
        <strong>USD:{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
