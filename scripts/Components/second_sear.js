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
