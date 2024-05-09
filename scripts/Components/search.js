const filterByIngredients = (recipes, filterValue) => {
  return recipes.filter(
    (recipe) =>
      recipe.ingredients &&
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(filterValue.toLowerCase())
      )
  );
};

const filterByUstensils = (recipes, filterValue) => {
  return recipes.filter(
    (recipe) =>
      recipe.ustensils &&
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(filterValue.toLowerCase())
      )
  );
};

const filterByAppliances = (recipes, filterValue) => {
  return recipes.filter(
    (recipe) =>
  
      recipe.appliance.toLowerCase().includes(filterValue)
      
  );
};

export { filterByIngredients, filterByUstensils, filterByAppliances };
