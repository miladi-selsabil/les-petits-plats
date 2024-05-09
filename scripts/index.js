import { cardFactory } from "./factories/recipesCard.js";
import { tagFactory } from "./factories/tags.js";
import { recipes } from "./data/recipes.js";
import { tagAppliance } from "./factories/tagsApplian.js";
import { tagsUstensils } from "./factories/tagsUstensils.js";
import { filterByUstensils, filterByIngredients, filterByAppliances } from "./Components/test.js";
const resultFilter = {
  recipes: [],
};
async function init(array) {
  const cardContainer = document.querySelector(".card_container");
  const ingredientContainer = document.querySelector(".ingredients-list");
  const ustensilContainer = document.querySelector(".ustensils-list");
  const applianceContainer = document.querySelector(".appareil-list");

  let cardsHTML = "";
  let tagsHTML = "";
  let tagsUstensilsHTML = "";
  let tagsApplianceHTML = "";
  let ingredientsList = [];
  let ustensilsList = [];
  let appliancesList = [];
  array.forEach((recipe) => {
    const cardData = cardFactory(recipe);
    cardsHTML += cardData.factory();
    recipe.ingredients.forEach((item) => {
      ingredientsList.push(item.ingredient.toLowerCase());
    });
    recipe.ustensils.forEach((item) => {
      ustensilsList.push(item);
    });

    appliancesList.push(recipe.appliance.trim().toLowerCase());

  });
  const tagData = tagFactory(ingredientsList);
  tagsHTML += tagData.factory();
  const tagUst = tagsUstensils(ustensilsList);
  tagsUstensilsHTML += tagUst.factory();
  const tagApp = tagAppliance(appliancesList);
  tagsApplianceHTML += tagApp.factory()
  cardContainer.innerHTML = cardsHTML;
  ingredientContainer.innerHTML = tagsHTML;
  ustensilContainer.innerHTML = tagsUstensilsHTML;
  applianceContainer.innerHTML = tagsApplianceHTML;

  function updateRecipeDisplay() {
    if (resultFilter.recipes.length === 0) {
      console.log("No results to display.");
    }
   let cardsHTML = "";
   resultFilter.recipes.forEach((recipe) => {
     const cardData = cardFactory(recipe);
     cardsHTML += cardData.factory();
   });

   cardContainer.innerHTML = cardsHTML;
  }

  resultFilter.recipes = array;

  let activeTags = [];

  function handleSelection(tagText, type) {
    const normalizedTagText = tagText.toLowerCase();

    /*Verifie si le tag est deja actif*/
    if (!activeTags.includes(normalizedTagText)) {
      const newTag = createTag(normalizedTagText, type);
      document.getElementById("filters-selected").appendChild(newTag);
      activeTags.push(normalizedTagText); 
      filterRecipesByTag(normalizedTagText, type);
      updateRecipeDisplay();
    }
  }

  function createTag(tagText, type) {
    const tagDiv = document.createElement("div");
    tagDiv.className = `tag tag-${type}`;
    tagDiv.textContent = tagText;
    tagDiv.addEventListener("click", () => {
      tagDiv.remove();
      resultFilter.recipes = array;
      updateRecipeDisplay();
    })
    return tagDiv;
  }

  function filterRecipesByTag(tag, type) {
    console.log("Filtering recipes by:", tag, "of type:", type);
    switch (type) {
      case "ingredient":
        resultFilter.recipes = filterByIngredients(resultFilter.recipes, tag);
        break;
      case "ustensil":
        resultFilter.recipes = filterByUstensils(resultFilter.recipes, tag);
        break;
      case "appliance":
        resultFilter.recipes = filterByAppliances(resultFilter.recipes, tag);
        break;
    }
    console.log("Filtered recipes:", resultFilter.recipes);
  }


  /* Ajout des écouteurs d'événements pour les tags*/
  ingredientContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      handleSelection(event.target.textContent, "ingredient");
    }
  });

  ustensilContainer.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      handleSelection(event.target.textContent, "ustensil");
    }
  });

 applianceContainer.addEventListener("click", (event) => {
   if (event.target.tagName === "LI") {
     const selectedAppliance = event.target.textContent.toLowerCase().trim();
     console.log("Selected Appliance:", selectedAppliance);
     handleSelection(selectedAppliance, "appliance");
   }
 });

 





}
init(recipes);
