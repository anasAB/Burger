import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
import Button from "../../UI/Buttons/button";

const controls = [
  { label: "Salad", type: "salad", cost: 1 },
  { label: "Bacon", type: "bacon", cost: 2 },
  { label: "Cheese", type: "cheese", cost: 3 },
  { label: "Meat", type: "meat", cost: 4 }
];

const buildControls = props => (
  <div className="BuildControls">
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.IngredintAdd(ctrl.type)}
        remove={() => props.remove(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
        cost={ctrl.cost}
      />
    ))}

    {/*<button
      className="OrderButton"
      disabled={!props.order}
      onClick={props.HiderOrder}
    >
      Order Now
    </button> */}

    <Button
      btnType="OrderButton"
      disabled={!props.order}
      clicked={props.HiderOrder}
    >
      Order Now
    </Button>
  </div>
);
export default buildControls;
