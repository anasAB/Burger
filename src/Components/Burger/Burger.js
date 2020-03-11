import React from "react";
import "./burger.css";
import BurgerIngredients from "./BurgerIngredient/BurgerIngredients";

const burger = (props, ingredients) => {
  //Transofrmed the ingredients Object into Array
  // const Transformedingredients = Object.keys(props.ingredients)
  // .map(igkey => {return [...Array(props.ingredients[igkey])]})
  // .map( (_,i) => {return <BurgerIngredients key={igkey + i} type={igkey} />} } );

  let Transformedingredients = Object.keys(props.ingredients)
    .map(igkey => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredients key={igkey + i} type={igkey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (Transformedingredients.length === 0) {
    Transformedingredients = <p>Add Some Ingredients!</p>;
  }

  // console.log("Transformedingredients", Transformedingredients);

  return (
    <div className="Burger">
      <h2>Burger Ingredients</h2>
      <h4>
        Total Price: <span> {props.totalPrice}</span>
      </h4>

      <BurgerIngredients
        type="bread-top"
        ingredientsCost={props.ingredientsCost}
      />
      {Transformedingredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
