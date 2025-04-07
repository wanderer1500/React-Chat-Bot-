
import React from "react";

import ClaudeRecipe from "../components/ClaudeRecipe";
import IngredientsList from "../components/IngriedientList";
import {  getRecipeFromMistral } from "../ai"
export default function Main() {
 
  
    const [ingredients, setIngredients] = React.useState([
      "all the main spices",
      "pasta",
      "ground beef",
      "tomato paste",
    ]);
    const [recipeShown, setRecipeShown] = React.useState(false);
  
    async function getRecipe() {
    //   setRecipeShown((prevShown) => !prevShown);
    const generatedRecipeMarkdown=await getRecipeFromMistral(ingredients)
    console.log(generatedRecipeMarkdown)
    }
  
    const ingredientsListItems = ingredients.map((ingredient) => (
      <li key={ingredient}>{ingredient}</li>
    ));
  
    function addIngredient(formData) {
      const newIngredient = formData.get("ingredient");
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
  
    return (
      <main>
        <form action={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <button>Add ingredient</button>
        </form>
  
        {ingredients.length > 0 && (
          <IngredientsList
            recipeShown={recipeShown}
            getRecipe={getRecipe}
            ingredients={ingredients}
            ingredientsListItems={ingredientsListItems}
           
          />
        )}
  
        {recipeShown && <ClaudeRecipe />}
      </main>
    );
  }
  