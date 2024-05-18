function handleSearch(value) {
  const userInput = value.toLowerCase();
  const newRecipes = [];
  const result = recipes;
  for (let i = 0; i < result.length; i++) {
    if (
      result[i].name.toLowerCase().includes(userInput) ||
      result[i].description.toLowerCase().includes(userInput) ||
      result[i].ingredients.some((el) =>
        el.ingredient.toLowerCase().includes(userInput)
      )
    ) {
      newRecipes.push(result[i]);
    }
  }
  resultFilter.recipes = newRecipes;

  handleTags(newRecipes);
  updateRecipeDisplay();
  displayRecipes(newRecipes);
}
