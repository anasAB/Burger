import React from "react";
import "./Input.css";

const input = props => {
  let inputElement = null;
  let style = "inputElement";
  let validationError = null;
  if (props.invalid && props.shouldValidate && props.touched) {
    style = "Invalid";
    validationError = <p>Please enter a valid value!</p>;
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={style}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "Text":
      inputElement = (
        <textarea
          className={style}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={style} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(item => (
            <option key={item.value} value={item.value}>
              {item.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={style}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className="Input">
      <label className="Label">{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;
