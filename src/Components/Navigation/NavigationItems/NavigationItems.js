import React from "react";
import "./NavigationItems.css";
import NavigationItem from "./NavigationItem";

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/">Burger Builder</NavigationItem>

    {props.isAuthenticatede ? (
      <>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logOut">LogOut</NavigationItem>
      </>
    ) : (
      <NavigationItem link="/Auth">Auth</NavigationItem>
    )}
  </ul>
);
export default navigationItems;
