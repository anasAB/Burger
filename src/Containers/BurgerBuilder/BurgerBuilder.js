import React, { Component } from "react";
import Aux from "../../hoc/Auxx";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios.oreder";
import Spinner from "../../Components/UI/Spinner/spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
// import * as actionType from "../../store/actions/actionTypes";
import * as BurgerBuilderActions from "../../store/actions/burgerBuilder";
import * as orderAction from "../../store/actions/order";

class BurgerBuilder extends Component {
  state = {
    //!Just be Sure the ingredients has the same names, otherwise it's will not work
    purchasable: false, // ! Hide/Show
    orderSummaryHidden: false //! Hide the Order Summary
  };

  componentDidMount() {
    this.props.onFetchingIntialIngredients();
  }

  //! Order Button, we will pass the Ingredients after we updated it

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0; //!it's will return True Or False
    // this.setState({ purchasable: sum > 0 });
  }

  //!Hide the Order Button
  OrderHandler = () => {
    this.setState({ orderSummaryHidden: true });
  };

  //!Closed Modal, Used in both Modal & OrderSummary for Closing
  modalHandler = () => {
    this.setState({ orderSummaryHidden: false });
  };

  //! sending the Order into the Database
  purchasContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("./Checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    //! return spinner till fetching the data is finished
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} totalPrice={this.props.price} />
          <BuildControls
            IngredintAdd={this.props.onIngredientAdded}
            remove={this.props.onIngredientRemoved}
            disabled={this.props.ings}
            // ingredientsCost={Ingredients_PRICES}
            order={this.updatePurchaseState(this.props.ings)}
            HiderOrder={this.OrderHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          closeOrderSummary={this.modalHandler}
          continue={this.purchasContinueHandler}
          totalPrice={this.props.price}
        />
      );
    }

    if (this.state.spinner) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.orderSummaryHidden}
          closeModal={this.modalHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  console.log("Burger Builder State", state);
  return {
    ings: state.burgerbuilder.ingredients,
    price: state.burgerbuilder.totalPrice,
    error: state.burgerbuilder.error,
    purchased: state.burgerbuilder.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => {
      dispatch(BurgerBuilderActions.addIngredient(ingName));
    },

    onIngredientRemoved: ingName =>
      dispatch(BurgerBuilderActions.removeIngredient(ingName)),

    onFetchingIntialIngredients: () =>
      dispatch(BurgerBuilderActions.initialIngredients()),

    onInitPurchase: () => dispatch(orderAction.purchased())
  };
};
// initialIngredients
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
