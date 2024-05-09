let selectedFilters = [];
function selectItem(selectedElement) {
  const filterValue = selectedElement.textContent.toLowerCase();
  if (!selectedFilters.some((filter) => filter.toLowerCase() === filterValue)) {
    selectedFilters.push(filterValue);
    searchByFilters(selectedFilters);
  } else {
    const selectedItemClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (selectedItemClone) {
      removeSelectedItem(selectedElement, selectedItemClone);
      setTimeout(function () {
        // timeout to wait for the DOM to update
        searchByFilters(selectedFilters);
      }, 0);
    }
  }
  updateSelectedVisuals();
}

function updateSelectedItemLayout(selectedElement) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const svgDropdown = selectedElement.querySelector("svg");

  if (!selectedElement.classList.contains("selected")) {
    selectedElement.classList.add("selected");
    selectedElement.style.height = "37px";
    selectedElement.setAttribute("data-filter", filterValue);
    const existingClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );

    if (!existingClone) {
      selectedItemClone = document.createElement("li");
      selectedItemClone.textContent = filterValue;
      selectedItemClone.classList.add("selected-item");
      selectedItemClone.setAttribute("data-filter", filterValue);
      selectedItemClone.onclick = function () {
        selectItem(this);
      };
      selectedContainer.appendChild(selectedItemClone);
    }
  }
  if (!svgDropdown) {
    createDropdownSVG();
  }
  if (!selectedItemClone.querySelector("svg")) {
    createCloneSVG();
  }

  // ------------------SVG IN THE DROPDOWN------------------------
  function createDropdownSVG() {
    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "17");
    svgElement.setAttribute("height", "17");
    svgElement.setAttribute("viewBox", "0 0 17 17");
    var circleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circleElement.setAttribute("cx", "8.5");
    circleElement.setAttribute("cy", "8.5");
    circleElement.setAttribute("r", "8.5");
    circleElement.setAttribute("fill", "black");
    var pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
    );
    pathElement.setAttribute("stroke", "#FFD15B");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(circleElement);
    svgElement.appendChild(pathElement);
    selectedElement.appendChild(svgElement);
  }
  // clone svg
  function createCloneSVG() {
    if (!selectedItemClone) {
      console.error("selectedItemClone is undefined");
    }
    var svgElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("width", "14");
    svgElement.setAttribute("height", "13");
    svgElement.setAttribute("viewBox", "0 0 14 13");
    svgElement.setAttribute("fill", "none");
    var pathElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathElement.setAttribute(
      "d",
      "M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
    );
    pathElement.setAttribute("stroke", "#1B1B1B");
    pathElement.setAttribute("stroke-width", "2.16667");
    pathElement.setAttribute("stroke-linecap", "round");
    pathElement.setAttribute("stroke-linejoin", "round");
    svgElement.appendChild(pathElement);
    selectedItemClone.appendChild(svgElement);
  }
}

function removeSelectedItem(selectedElement, selectedItemClone) {
  const filterValue = selectedElement.textContent.trim().toLowerCase();

  const index = selectedFilters.indexOf(filterValue);
  if (index !== -1) {
    selectedFilters.splice(index, 1);
  }
  if (selectedFilters.length === 0) {
    searchInput.value = "";
    resetPageState();
  }
  selectedElement.classList.remove("selected");
  selectedElement.style.height = "";
  selectedElement.querySelector("svg")?.remove();

  if (document.body.contains(selectedItemClone)) {
    setTimeout(function () {
      // timeout to wait for the DOM to update
      selectedItemClone.querySelector("svg")?.remove();
      selectedItemClone.remove();
    }, 0);
  }
}

// function resetPageState() {
//   updateDropdownOptions(1, allIngredients, "ingredient");
//   updateDropdownOptions(2, allAppliances, "appliance");
//   updateDropdownOptions(3, allUstensils, "ustensil");
//   populateCards(recipes);
//   updateRecipeCount();
// }

function updateSelectedVisuals() {
  const containers = [
    ingredientContainer,
    ustensilsContainer,
    selectedContainer,
  ];

  containers.forEach((container) => {
    const allSelectedItems = container.querySelectorAll('[class*="selected"]');

    allSelectedItems.forEach((selectedItem) => {
      const filterValue = selectedItem.getAttribute("data-filter");
      const selectedItemText = selectedItem.textContent.trim().toLowerCase();

      if (
        !selectedFilters.includes(filterValue) &&
        !selectedFilters.includes(selectedItemText)
      ) {
        removeSelectedItem(selectedItem, null, null);
      }
    });
  });
}
