import React from "react";
import "./BuildControl.css";
import Button from "../../../UI/Buttons/button";

const buildControl = props => (
  <div className="BuildControl">
    <div className="Label">
      {props.label}
      <strong> :{props.cost}</strong>
    </div>
    {/* <button className="Less" onClick={props.remove} disabled={!props.disabled}>
      Less
    </button> */}
    {/* <button className="More" onClick={props.added}>
      More
    </button> */}

    <Button btnType="Less" clicked={props.remove} disabled={!props.disabled}>
      Less try
    </Button>

    <Button btnType="More" clicked={props.added}>
      Add
    </Button>
  </div>
);

export default buildControl;
