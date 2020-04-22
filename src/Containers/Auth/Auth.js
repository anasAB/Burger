import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Buttons/button";
import "./Auth.css";
import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";
import Spinner from "../../Components/UI/Spinner/spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
    error: "",
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  componentDidMount() {
    if (!this.props.buildBurger) {
      console.log(
        "building Burger 1111111111",
        this.props.buildBurger,
        this.props.token
      );
      this.props.onSetAuthRedirectpath();
    } else {
      console.log(
        "building Burger 222222222222",
        this.props.buildBurger,
        "path",
        this.props.authRedirectPath
      );
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuh(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  //!Switch To SignUp
  siwtchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const formElement = [];
    for (let key in this.state.controls) {
      formElement.push({ id: key, config: this.state.controls[key] });
    }

    let form = formElement.map((elment) => (
      <Input
        key={formElement.id}
        elementType={elment.config.elementType}
        elementConfig={elment.config.elementConfig}
        value={elment.config.value}
        invalid={!elment.config.valid}
        shouldValidate={elment.config.validation}
        touched={elment.config.touched}
        changed={(event) => this.inputChangedHandler(event, elment.id)}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = "";
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.token) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="AuthData">
        <form onSubmit={this.submitHandler}>
          <h4>Enter your Contact Data</h4>
          {form}
          <Button btnType="Success">Success</Button>
        </form>
        <Button btnType="Danger" clicked={this.siwtchAuthModeHandler}>
          Switch To {this.state.isSignup ? " SignIn" : "SignUp "}
        </Button>
        {errorMessage}
      </div>
    );
  }
}

//! i want to add the error to the UI when i Signin/SignUp
const mapStateToProps = (state) => {
  console.log("AUTH STATE", state);
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    token: state.auth.token !== null,
    buildBurger: state.burgerbuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuh: (Email, password, isSignUp) =>
      dispatch(actions.auth(Email, password, isSignUp)),

    onSetAuthRedirectpath: (path) => dispatch(actions.SetAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
