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
} from "./Components/filter.js";
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

  resultFilter.recipes = array;

  let activeTags = [];

  function handleSelection(tagText, type) {
    const normalizedTagText = tagText.toLowerCase();
    /*Verifie si le tag est deja actif*/
    if (!activeTags.includes(normalizedTagText)) {
      const newTag = createTag(normalizedTagText, type);
      document.getElementById("filters-selected").appendChild(newTag);
      activeTags.push(normalizedTagText);
     
      handleSearch();
    }
  }

  function filterRecipesByTag(recipes, tag, type) {

    switch (type) {
      case "ingredient":
        return filterByIngredients(recipes, tag);
      case "ustensil":
        return filterByUstensils(recipes, tag);
      case "appliance":
        return filterByAppliances(recipes, tag);
      default:
        return recipes;
    }
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
      
      handleSearch();
    });

    return tagDiv;
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
  function filterRecipesByTag(recipes, tag, type) {

    switch (type) {
      case "ingredient":
        return filterByIngredients(recipes, tag);
      case "ustensil":
        return filterByUstensils(recipes, tag);
      case "appliance":
        return filterByAppliances(recipes, tag);
      default:
        return recipes;
    }
  }
  function refilterRecipes() {
    /*Réinitialisez à toutes les recettes.*/
    filteredRecipes = recipes;

    activeTags.forEach((tag) => {
      let type = determineTagType(tag);
      filteredRecipes = filterRecipesByTag(filteredRecipes, tag, type);
    });
  }
 
 document.getElementById("search").addEventListener("input", (event) => {
   searchText = event.target.value.toLowerCase();
   if (searchText.length >= 3) {
     handleSearch(searchText);
   } else {
     handleSearch("");
   }
 });

 let searchText = "";
 let filteredRecipes = [];
 function handleSearch() {
   /* Applique d'abord les filtres de tags*/
   refilterRecipes();
   // Liste temporaire pour les recettes filtrées par recherche textuelle
   let initialFilteredRecipes = [];
   for (let i = 0; i < filteredRecipes.length; i++) {
     let recipe = filteredRecipes[i];
     if (
       recipe.name.toLowerCase().includes(searchText) ||
       recipe.description.toLowerCase().includes(searchText) ||
       recipe.ingredients.some((ingredient) =>
         ingredient.ingredient.toLowerCase().includes(searchText)
       )
     ) {
       initialFilteredRecipes.push(recipe);
     }
   }

   // Mise à jour des recettes filtrées après tous les filtrages
   resultFilter.recipes = initialFilteredRecipes;
   displayRecipes(initialFilteredRecipes);
   updateRecipeCount();
   handleTags(initialFilteredRecipes);
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
  const cardContainer = document.querySelector(".card_container");

  if (recipes.length === 0) {
    cardContainer.innerHTML = `<h2 class="w-100 px-3 text-center"> Aucune recette ne correspond à votre recherche... <br> Vous pouvez chercher « tarte aux pommes », « poisson », etc.</h2>`;
    return;
  }
  cardContainer.innerHTML = ''
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
    return;
  }

  const visibleRecipeCards = Array.from(document.querySelectorAll(".card")).filter(card => card.style.display !== 'none');
  const numberOfRecipes = visibleRecipeCards.length;

  let recipeText = numberOfRecipes === 1 ? "recette" : "recettes";
  recipeCountElement.textContent = numberOfRecipes > 0 ? `${numberOfRecipes} ${recipeText}` : "Aucune recette";
}


init(recipes);
initDropdownEvent();
