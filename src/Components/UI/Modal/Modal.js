import React, { Component } from "react";
import "./Modal.css";
import Aux from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";

//This Modal used to wrap the OrderSummary
class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    // console.log("Modal will update");
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} closeModal={this.props.closeModal} />
        <div
          className="Modal"
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
