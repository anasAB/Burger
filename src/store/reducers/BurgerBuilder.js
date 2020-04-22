import * as actionType from "../actions/actionTypes";
import { updatedObject } from "../utilitiy";

const initialState = {
  ingredients: null,
  error: false,
  Ingredients_PRICES: {
    salad: 1,
    bacon: 2,
    cheese: 3,
    meat: 4,
  },
  totalPrice: 3,
  purchased: false,
  building: false, //! we will need it for the store Ingredient when we redirect back from the Auth page to burgerbuilder
};

const addIngredient = (state, action) => {
  console.log("# STATE--", state);
  const updatedIngredient = {
    [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1,
  };

  const updatedIngredients = updatedObject(
    state.ingredients,
    updatedIngredient
  );

  const updateState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice + state.Ingredients_PRICES[action.ingredientsName],
    building: true,
  };

  return updatedObject(state, updateState);
};

//?===end Add Ingredient===

const removeIngredieent = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1,
    },
    totalPrice:
      state.totalPrice - state.Ingredients_PRICES[action.ingredientsName],
    building: true,
  };
};

const reducer = (state = initialState, action) => {
  // console.log(
  //   "actionType.ADD_INGRDIENT",
  //   [action.ingredientsName],
  //   state.ingredients[action.ingredientsName],
  //   "Pricexxx:",
  //   state.totalPrice + state.Ingredients_PRICES[action.ingredientsName]
  // );

  switch (action.type) {
    case action.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionType.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        purchased: false,
        totalPrice: 4,
        builder: false,
      };

    case actionType.FAILED_FETCHING:
      return {
        ...state,
        error: true,
      };

    case actionType.ADD_INGRDIENT:
      return addIngredient(state, action);

    case actionType.REMOVE_INGRDIENT:
      return removeIngredieent(state, action);
    default:
      return state;
  }
};

export default reducer;
