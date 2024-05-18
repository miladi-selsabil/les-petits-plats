export function tagsUstensils(ustensils) {
  function factory() {
    let cardUstensils = "";
        const ustensilesNormalises = ustensils.map((ustensil) =>
          ustensil.toLowerCase()
        );

    const listUstensils = [...new Set(ustensilesNormalises)].sort();
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
