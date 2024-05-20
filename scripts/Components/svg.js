export function createSVG() {
  var svgElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgElement.setAttribute("width", "20"); 
  svgElement.setAttribute("height", "20");
  svgElement.setAttribute("viewBox", "0 0 20 20");
  var pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute("d", "M15 15L10 10M10 10L5 5M10 10L15 5M10 10L5 15");
  pathElement.setAttribute("stroke", "black"); 
  pathElement.setAttribute("stroke-width", "2"); 
  pathElement.setAttribute("stroke-linecap", "round");
  pathElement.setAttribute("stroke-linejoin", "round");
  svgElement.appendChild(pathElement);
  return svgElement;
}

