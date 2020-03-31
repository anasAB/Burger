import * as actionTypes from "./actionTypes";
import axios from "../../axios.oreder";

//! crate action creator

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGRDIENT,
    ingredientsName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGRDIENT,
    ingredientsName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const failedFetching = () => {
  return {
    type: actionTypes.FAILED_FETCHING
  };
};

export const purchased = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

//! Fetch Initial Burger Ingredients
export const initialIngredients = () => {
  return dispatch => {
    dispatch(purchased());
    axios
      .get("https://reactproject-burger.firebaseio.com/Ingredients.json")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(failedFetching());
      });
  };
};
