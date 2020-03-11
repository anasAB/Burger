import React from "react";
import "./Backdrop.css";

//!It's will be the black background when we click on Order Button
const backdrop = props =>
  props.show ? (
    <div className="Backdrop" onClick={props.closeModal}></div>
  ) : null;

// const backdrop = props =>
//   props.show ? (
//     <div className={classes.Backdrop} onClick={props.clicked}></div>
//   ) : null;

export default backdrop;
