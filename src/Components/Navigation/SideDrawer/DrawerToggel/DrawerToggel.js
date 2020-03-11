import React from "react";
import "./DrawerToggel.css";

const drawerToggle = props => (
  <div className="DrawerToggle" onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
