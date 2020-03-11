import React from "react";

import "./toolbar.css";
import Logo from "../../Logo/logo";

import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggel/DrawerToggel";

const toolbar = props => (
  // <header className="Toolbar">
  //   <DrawerToggle clicked={props.drawerToggleClicked} />
  //   {/* <div className="Logo">
  //     <Logo />
  //   </div> */}

  //   <h2>Menu</h2>
  //   <nav className="DesktopOnly">
  //     <NavigationItems />
  //   </nav>
  // </header>

  <header className="Toolbar">
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className="Logoo">
      <Logo />
    </div>
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
