import React from "react";
import "./button.css";

const button = props => (
  <button
    onClick={props.clicked}
    className={["Button", [props.btnType]].join(" ")}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default button;
