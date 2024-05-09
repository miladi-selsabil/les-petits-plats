export function tagsUstensils(ustensils) {
  function factory() {
    let cardUstensils = "";
    const listUstensils = [...new Set(ustensils)].sort();
        console.log("ustensils", listUstensils);
    for (let ustensil of listUstensils) {
      cardUstensils += `
        <li>${ustensil}</li>
        `;
    }
    return `
    ${cardUstensils}
    `;
  }
  return { ustensils, factory };
}
