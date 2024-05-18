const dropdown1 = document.querySelector(".dropdown1");
const dropdown2 = document.querySelector(".dropdown2");
const dropdown3 = document.querySelector(".dropdown3");
const visiblePart1 = document.querySelector(".dd1-visiblepart");
const visiblePart2 = document.querySelector(".dd2-visiblepart");
const visiblePart3 = document.querySelector(".dd3-visiblepart");
const dropdownArrow1 = document.getElementById("dropdownArrow1");
const dropdownArrow2 = document.getElementById("dropdownArrow2");
const dropdownArrow3 = document.getElementById("dropdownArrow3");
export function initDropdownEvent(){
visiblePart1.addEventListener("click", function () {
  dropdownArrow1.classList.toggle("rotate180");
  dropdown1.classList.toggle("open");
});

visiblePart2.addEventListener("click", function () {
  dropdownArrow2.classList.toggle("rotate180");
  dropdown2.classList.toggle("open");
});

visiblePart3.addEventListener("click", function () {
  dropdownArrow3.classList.toggle("rotate180");
  dropdown3.classList.toggle("open");
});

//Dropdown 1
const dd1Input = document.getElementById("dd1-input");

dd1Input.addEventListener("input", function () {
  const inputValue = dd1Input.value.toLowerCase();
  const dd1ListContainer = document.getElementById("dd1-list");
  const dd1Options = dd1ListContainer.querySelectorAll("li");
  let matches = []; // Créer un tableau pour stocker les éléments qui correspondent

  dd1Options.forEach((option) => {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";

    // Si l'élément correspond, l'ajouter au tableau des correspondances
    if (isMatch) {
      matches.push(optionText);
    }
  });

  // Afficher dans la console la liste des éléments qui correspondent
  console.log("Matches found:", matches);
});


// Dropdown 2
const dd2Input = document.getElementById("dd2-input");

dd2Input.addEventListener("input", function () {
  const inputValue = dd2Input.value.toLowerCase();
  const dd2ListContainer = document.getElementById("dd2-list");
  const dd2Options = dd2ListContainer.querySelectorAll("li");

  dd2Options.forEach((option) => {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  });
});

// Dropdown 3

const dd3Input = document.getElementById("dd3-input");

dd3Input.addEventListener("input", function () {
  const inputValue = dd3Input.value.toLowerCase();
  const dd3ListContainer = document.getElementById("dd3-list");
  const dd3Options = dd3ListContainer.querySelectorAll("li");

  dd3Options.forEach((option) => {
    const optionText = option.textContent.toLowerCase();
    const isMatch = optionText.includes(inputValue);
    option.style.display = isMatch ? "flex" : "none";
  });
});

 
}export function sear(){
const globalSearch = document.getElementById("search");
globalSearch.addEventListener("input", () => {
  const searchText = globalSearch.value.toLowerCase();
  ["dd1-list", "dd2-list", "dd3-list"].forEach((listId) => {
    const list = document.getElementById(listId);
    const items = list.querySelectorAll("li");
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(searchText) ? "block" : "none";
    });
  });
});
}