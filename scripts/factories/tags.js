export function tagFactory(ingredients) {


  function factory() {
    let cardIngredients = "";
      
      const listIngredients = [...new Set(ingredients)].sort();
          console.log("list", listIngredients);

    for (let ingredient of listIngredients) {
      cardIngredients += `
      <li>${ingredient}</li>`;
    }

    return `
    ${cardIngredients}
           `;
  }

  return { ingredients, factory };
}


