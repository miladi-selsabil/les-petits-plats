const filterByIngredients = (recipes, filterValue) => {
  return recipes.filter((recipe) =>
    recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(filterValue.toLowerCase())
    )
  );
};

const filterByUstensils = (recipes, filterValue) => {
  return recipes.filter((recipe) =>
    recipe.ustensils.some((ustensil) =>
      ustensil.toLowerCase().includes(filterValue.toLowerCase())
    )
  );
};
// const filterByAppareil = (recipes, filterValue) =>{
//     return recipes.filter((recipe) =>
//         recipe.appareil.some((appareil) =>
//         appareil.toLowerCase().icludes(filterValue.toLowerCase())
// ))      

// }
export { filterByIngredients, filterByUstensils };
