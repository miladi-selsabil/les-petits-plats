export function cardFactory(data) {
    const { id, name, description, ingredients, servings, appliance, time, ustensils } = data;

    function factory() {
        let cardIngredients = "";
        let imageUrl = `assets/img/Recettes/${data.image}`;
        for (let ingredient of ingredients) {
            let ingredientQuantity = "";
            if (ingredient.quantity) {
                ingredientQuantity = `${ingredient.quantity}`;
            }
            let ingredientUnit = "";
            if (ingredient.unit) {
                ingredientUnit = `${ingredient.unit}`;
            }
            cardIngredients += `
                <li class="card-ingredients-list-item">
                    <span class="card-ingredients-list-item-ingredient">${ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1)}</span>
                    <span class="card-ingredients-list-item-quantity">${ingredientQuantity}${ingredientUnit}</span>
                    
                </li>`;
        }
        
        return `
            <div class="card" ${data.id}>
                <div class="card-img-top">
                <img src="${imageUrl}" alt="${data.name}"/>
                <span class="card-time">${time} min</span>
                </div>
                <div ></div>
                <div class="card-body">
                    <div class="row mb-2">
                        <h2 class="card-title col-8 card-name">${name}</h2>
                    </div>
                    <div class="row">
                    <div class="recette">
                    <p class="recette-title">RECETTE</p>
                 
                    <p class="card-text card-description">${description.replace(
                      /(.{185})..+/,
                      "$1..."
                    )}</p>
                    </div>
                    <div>
                    <p class="ingredients-title">INGREDIENTS</p>
                        <ul class="card-text list-unstyled" card-ingredients">${cardIngredients}</ul>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    
    return {id, name, description, ustensils, cardIngredients: factory(), factory };
}
