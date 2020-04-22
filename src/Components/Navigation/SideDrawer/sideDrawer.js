import React from "react";
import Logo from "../../Logo/logo";
import NavigationItems from "../NavigationItems/NavigationItems";
// import "./SideDrawer.css";
import "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxx";

const sideDrawer = (props) => {
  let attachedClasses = ["SideDrawer", "Close"];

  if (props.open) {
    attachedClasses = ["SideDrawer", "Open"];
  }

  return (
    <Aux>
      <Backdrop show={props.open} closeModal={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className="sideDrawerLogo">
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticatede={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
