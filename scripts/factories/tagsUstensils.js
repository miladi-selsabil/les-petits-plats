export function tagsUstensils (data){
const {ustensils}= data;
function factory(){
    let cardUstensils= "";
    console.log("ustensils", ustensils);
    for(let ustensil of ustensils){
        cardUstensils += 
        `
        <li>${ustensil}</li>
        `
    }
    return`
    ${cardUstensils}
    `;
}
return{ustensils, cardUstensils: factory(), factory}
}