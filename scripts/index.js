import { cardFactory } from "./factories/recipesCard.js";
import { tagFactory } from "./factories/tags.js";
import { recipes } from "./data/recipes.js";
import { tagAppliance } from "./factories/tagsApplian.js";
import { tagsUstensils } from "./factories/tagsUstensils.js";
async function init(array) {
  const cardContainer = document.querySelector(".card_container");
  const ingredientContainer = document.querySelector("#ingredients-list");
  const applianceContainer = document.querySelector("#appareil-list");
  const ustensilContainer = document.querySelector("#ustensils-list"); 
  const search = document.querySelector("form");
  const result = document.querySelector(".resultat")
  const resultUst = document.querySelector(".resultat-us");

  let cardsHTML = "";
  let tagsHTML = "";
  // let tagsapplianceHTML = "";
  let tagsUstensilsHTML = "";
  let searchHTML = "";
  let ingredientsList = [];
  let appliancesList = [];
  let ustensilsList = [];

  array.forEach((recipe) => {
    const cardData = cardFactory(recipe);
    const tagData = tagFactory(recipe);
    // const tagApp = tagAppliance(recipe)
    const tagUst = tagsUstensils(recipe);
    cardsHTML += cardData.factory();
    tagsHTML += tagData.factory();
    tagsUstensilsHTML += tagUst.factory();
    // tagsapplianceHTML += tagApp.factory();
    recipe.ingredients.forEach((item) => {
      ingredientsList.push(item.ingredient.toLowerCase());
    });
    recipe.ustensils.forEach((item) => {
      ustensilsList.push(item.ustensil)
    });
    // recipe.appliance.forEach((item) => {
    //   appliancesList.push(item.appliances.toLowerCase());
    // });
  });

  cardContainer.innerHTML = cardsHTML;
  ingredientContainer.innerHTML = tagsHTML;
  ustensilContainer.innerHTML = tagsUstensilsHTML;
  // applianceContainer.innerHTML = tagsapplianceHTML;
  const selectedIngredients = new Set();   
   const selectedUstensils = new Set();

  ustensilContainer.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () =>{
    const ustensilsText = li.textContent;
    if(selectedUstensils.has(ustensilsText)){
      selectedUstensils.delete(ustensilsText);
      li.classList.remove("selected");
    } else {
      selectedUstensils.add(ustensilsText);
      li.classList.add("selected");
    }
     const filteredRecipes = array.filter((recipe) =>
       recipe.ustensils.some((item) =>
         selectedUstensils.has(item.ustensil)
       )
     );
     cardContainer.innerHTML = filteredRecipes
       .map((recipe) => cardFactory(recipe).factory())
       .join("");

     //  affiche les ingrédients sélectionnés
     resultUst.innerHTML = `
<p>Selected: ${Array.from(selectedUstensils).join(", ")}</p>
`;
     console.log("Selected ustensiles", selectedUstensils);
     console.log("Filtered Recipes", filteredRecipes);
  })
})
ingredientContainer.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => {
    const ingredientText = li.textContent.toLowerCase();
    if (selectedIngredients.has(ingredientText)) {
      selectedIngredients.delete(ingredientText);
      li.classList.remove("selected"); 
    } else {
      selectedIngredients.add(ingredientText);
      li.classList.add("selected");
    }

    // Filtre les recettes en fonction des ingrédients sélectionnés
    const filteredRecipes = array.filter((recipe) =>
      recipe.ingredients.some((item) =>
        selectedIngredients.has(item.ingredient.toLowerCase())
      )
    );

    // Mise à jour de l'affichage des recettes
    cardContainer.innerHTML = filteredRecipes
      .map((recipe) => cardFactory(recipe).factory())
      .join("");

    //  affiche les ingrédients sélectionnés
    result.innerHTML = `
<p>Selected: ${Array.from(selectedIngredients).join(", ")}</p>
`
    console.log("Selected Ingredients", selectedIngredients);
    console.log("Filtered Recipes", filteredRecipes);
  });
});
search.addEventListener("keyup", (e) => {
  const searchText = e.target.value.trim().toLowerCase(); 

  // Filtre les recettes qui contiennent l'ingrédient recherché
  const filteredRecipes = [];
  for (let i = 0; i < array.length; i++) {
    const recipe = array[i];
    const ingredients = recipe.ingredients.map((item) =>
      item.ingredient.toLowerCase()
    );
    if (ingredients.includes(searchText) ) {
      filteredRecipes.push(recipe);
    }
  }
 const filteredRecipe = [];
 for (let i = 0; i < array.length; i++) {
   const recipe = array[i];
   const ustensils = recipe.ustensils.map((item) =>
     item.ustensil
   );
   if (ustensils.includes(searchText)) {
     filteredRecipe.push(recipe);
   }
 }
  //Génére le HTML des cartes filtrées
  const filteredCardsHTML = filteredRecipes

    .map((recipe) => cardFactory(recipe).factory())
    .join("");

  // Mets à jour le conteneur de cartes avec les résultats de la recherche
  cardContainer.innerHTML = filteredCardsHTML;
});

  
 
}

init(recipes); 
