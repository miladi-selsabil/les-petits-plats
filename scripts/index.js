import { cardFactory } from "./factories/recipesCard.js";
import { tagFactory } from "./factories/tags.js";
import { recipes } from "./data/recipes.js";
import { tagAppliance } from "./factories/tagsApplian.js";
import { tagsUstensils } from "./factories/tagsUstensils.js";
import { filterByIngredients } from "./Components/search.js";
import { filterByUstensils } from "./Components/search.js";
const resultFilter = {
  recipes: [],
};
async function init(array) {
  const cardContainer = document.querySelector(".card_container");
  const ingredientContainer = document.querySelector("#ingredients-list");
  const applianceContainer = document.querySelector("#appareil-list");
  const ustensilContainer = document.querySelector("#ustensils-list");
  const search = document.querySelector("form");
  const result = document.querySelector(".resultat");
  const resultUst = document.querySelector(".resultat-us");

  let cardsHTML = "";
  let tagsHTML = "";
  // let tagsApplianceHTML = "";
  let tagsUstensilsHTML = "";
  let searchHTML = "";
  let ingredientsList = [];
  let appliancesList = [];
  let ustensilsList = [];

  array.forEach((recipe) => {
    const cardData = cardFactory(recipe);
    const tagData = tagFactory(recipe);
    const tagApp = tagAppliance(recipe);
    const tagUst = tagsUstensils(recipe);
    cardsHTML += cardData.factory();
    tagsHTML += tagData.factory();
    tagsUstensilsHTML += tagUst.factory();
    // tagsApplianceHTML += tagApp.factory();
    recipe.ingredients.forEach((item) => {
      ingredientsList.push(item.ingredient.toLowerCase());
    });

    recipe.ustensils.forEach((item) => {
      ustensilsList.push(item.ustensil);
    });
    // recipe.appliance.forEach((item) => {
    //   appliancesList.push(item.appliances.toLowerCase());
    // });
  });
   console.log(
     "Liste des ingrédients avant conversion en Set :",
     ingredientsList
   );
   ingredientsList = [...new Set(ingredientsList)].sort();
   console.log(
     "Liste des ingrédients après conversion en Set :",
     ingredientsList
   );


  cardContainer.innerHTML = cardsHTML;
  ingredientContainer.innerHTML = tagsHTML;
  ustensilContainer.innerHTML = tagsUstensilsHTML;
  function updateRecipeDisplay() {
    let cardsHTML = "";

    resultFilter.recipes.forEach((recipe) => {
      const cardData = cardFactory(recipe);
      cardsHTML += cardData.factory();
    });

    cardContainer.innerHTML = cardsHTML;
  }
  resultFilter.recipes = array;

  //écouteur d'événement pour sélectionner un ingrédient et filtrer les recettes
  ingredientContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "LI") {
      handleIngredientSelection(target.textContent);
    }
  });

  // Gère la sélection d'un ingrédient
  function handleIngredientSelection(ingredient) {
    const newTag = createIngredientTag(ingredient);
    document.getElementById("selected-ingredients").appendChild(newTag);
    resultFilter.recipes = filterByIngredients(
      resultFilter.recipes,
      ingredient
    );
    updateRecipeDisplay();
  }

  // tag visuel pour l'ingrédient avec un bouton de suppression
  function createIngredientTag(ingredient) {
    const newTag = document.createElement("div");
    newTag.classList.add("ingredient-tag");
    newTag.textContent = ingredient;

    const removeBtn = createRemoveButton(newTag);
    newTag.appendChild(removeBtn);
    return newTag;
  }

  //bouton pour supprimer un tag visuel
  function createRemoveButton(tagElement) {
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-tag");
    removeBtn.innerHTML = "&times;";
    removeBtn.addEventListener("click", () => {
      tagElement.remove();
      resultFilter.recipes = array;
      updateRecipeDisplay();
    });
    return removeBtn;
  }

  ustensilContainer.addEventListener("click", (event) => {
    const target = event.target;
    console.log(resultFilter.recipes.length);
    if (target.tagName === "LI") {
      const ingredientTag = target.textContent;
      resultFilter.recipes = filterByUstensils(
        resultFilter.recipes,
        ingredientTag
      );
    }
    console.log(resultFilter.recipes.length);
  });

}

init(recipes);
