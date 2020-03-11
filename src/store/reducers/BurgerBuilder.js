import * as actionType from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  error: false,
  Ingredients_PRICES: {
    salad: 1,
    bacon: 2,
    cheese: 3,
    meat: 4
  },
  totalPrice: 3,
  purchased: false
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
        purchased: false
      };
    case actionType.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        purchased: false,
        totalPrice: 4
      };

    case actionType.FAILED_FETCHING:
      return {
        ...state,
        error: true
      };

    case actionType.ADD_INGRDIENT:
      console.log("## Reducer actionType.ADD_INGRDIENT 2");
      return {
        ...state,
        ingredients: {
          ...state.ingredients, //! Copy the initialState
          //! OverWrite the initialState
          [action.ingredientsName]:
            state.ingredients[action.ingredientsName] + 1
        },
        totalPrice:
          state.totalPrice + state.Ingredients_PRICES[action.ingredientsName]

        // totalPrice:{totalPrice + state.ingredients[action.ingredientsName]},
      };

    case actionType.REMOVE_INGRDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientsName]:
            state.ingredients[action.ingredientsName] - 1
        },
        totalPrice:
          state.totalPrice - state.Ingredients_PRICES[action.ingredientsName]
      };

    default:
      return state;
  }
};

export default reducer;
