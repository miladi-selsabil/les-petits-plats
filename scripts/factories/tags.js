export function tagFactory(data) {
  const { id, ingredients } = data;

  function factory() {
    let cardIngredients = "";
    console.log("list", ingredients);
    for (let ingredient of ingredients) {
      cardIngredients += `
      <li>${ingredient.ingredient}</li>`;
      
    }

    return `
    ${cardIngredients}
           `;
  }

  return { ingredients, cardIngredients: factory(), factory };
}


