import { cardFactory } from "./factories/recipesCard.js";
import { tagFactory } from "./factories/tags.js";
import { tagAppliance } from "./factories/tagsApplian.js";
import { tagsUstensils } from "./factories/tagsUstensils.js";
import { recipes } from "./data/recipes.js";
import { initDropdownEvent } from "./Components/Dropdown.js";
import {
  filterByAppliances,
  filterByIngredients,
  filterByUstensils,
} from "./Components/search.js";
let resultFilter = {
  recipes: [],
  ingredients: [],
  ustensils: [],
  appliances: [],
};
import { createSVG } from "./Components/svg.js";
const cardContainer = document.querySelector(".card_container");
const ingredientContainer = document.querySelector(".ingredients-list");
const ustensilContainer = document.querySelector(".ustensils-list");
const applianceContainer = document.querySelector(".appareil-list");

async function init(array) {
  handleTags(recipes);
  displayRecipes(recipes);
  function updateRecipeDisplay() {
    if (resultFilter.recipes.length === 0) {
      console.log("No results to display.");
       cardContainer.innerHTML = `<h2 class="w-100 px-3 text-center"> Aucune recette ne correspond à votre recherche... <br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.</h2>`;
       return;
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
      updateRecipeCount()
    }
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
   
    handleTags(resultFilter.recipes);

    console.log("Filtered recipes:", resultFilter.recipes);
  }
 
  function createTag(tagText, type) {
    const tagDiv = document.createElement("div");
    tagDiv.className = `tag tag-${type}`;
    tagDiv.textContent = tagText;

    const svg = createSVG();
    tagDiv.appendChild(svg);

    tagDiv.addEventListener("click", () => {
      tagDiv.remove();
 
      activeTags = activeTags.filter((t) => t !== tagText.toLowerCase());
      refilterRecipes();
      handleTags(resultFilter.recipes);
      updateRecipeCount();
    });

    return tagDiv;
  }

/* Réinitialiser aux recettes originales*/
  function refilterRecipes() {
    resultFilter.recipes = array; 
    activeTags.forEach((tag) => {
      let type = determineTagType(tag);
      filterRecipesByTag(tag, type);
    });
    updateRecipeDisplay();
    updateRecipeCount();
  }

  function determineTagType(tag) {
    if (resultFilter.ingredients.includes(tag)) {
      return "ingredient";
    } else if (resultFilter.ustensils.includes(tag)) {
      return "ustensil";
    } else if (resultFilter.appliances.includes(tag)) {
      return "appliance";
    }
  }
const searchbarValue = (e) => {
  if (e.target.value.length > 2) {
    handleSearch(e.target.value);
  } else {
    handleSearch("");
  }
};
 document.getElementById("search").addEventListener("input", searchbarValue);

function handleSearch(value) {

  const userInput = value.toLowerCase();   

  if (userInput.length >= 3) {    

    resultFilter.recipes = resultFilter.recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(userInput) ||
        recipe.description.toLowerCase().includes(userInput) ||
        recipe.ingredients.some((el) =>
          el.ingredient.toLowerCase().includes(userInput)
        )

    ); 
    handleTags(resultFilter.recipes);
    updateRecipeDisplay()
    displayRecipes(resultFilter.recipes);    

  }else{    
    refilterRecipes()
    handleTags(resultFilter.recipes);

  }

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
const extractTags = (recipes) => {
  resetResult();
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((item) => {
      resultFilter.ingredients.push(item.ingredient.toLowerCase());
    });
    recipe.ustensils.forEach((item) => {
      resultFilter.ustensils.push(item);
    });

    resultFilter.appliances.push(recipe.appliance.trim().toLowerCase());
  });

};

const handleTags = (recipes) => {
  extractTags(recipes);
  displayTags();
};

const displayTags = () => {
  const tagData = tagFactory(resultFilter.ingredients);
  const tagUst = tagsUstensils(resultFilter.ustensils);
  const tagApp = tagAppliance(resultFilter.appliances);
  ingredientContainer.innerHTML = tagData.factory();
  ustensilContainer.innerHTML = tagUst.factory();
  applianceContainer.innerHTML = tagApp.factory();
};

const displayRecipes = (recipes) => {
  recipes.forEach((recipe) => {
    const cardData = cardFactory(recipe);
    cardContainer.innerHTML += cardData.factory();
  });
  updateRecipeCount()
};
const resetResult = () => {
  resultFilter = {
    ...resultFilter,
    ingredients: [],
    appliances: [],
    ustensils: [],
  };
};

function updateRecipeCount() {
  const recipeCountElement = document.getElementById("number-recipes");
  if (!recipeCountElement) {
    console.error('Element #number-recipes not found.');
    return;
  }

  const visibleRecipeCards = Array.from(document.querySelectorAll(".card")).filter(card => card.style.display !== 'none');
  const numberOfRecipes = visibleRecipeCards.length;
  console.log("Number of recipes:", numberOfRecipes);

  let recipeText = numberOfRecipes === 1 ? "recette" : "recettes";
  recipeCountElement.textContent = numberOfRecipes > 0 ? `${numberOfRecipes} ${recipeText}` : "Aucune recette";
}


init(recipes);
initDropdownEvent();
