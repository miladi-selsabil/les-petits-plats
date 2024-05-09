
export function tagAppliance(appliance){
  function factory(){
    let cardAppliance = "";
    const listAppliance = [...new Set(appliance)].sort();
    console.log("appareil", listAppliance);
    for(let appliances of listAppliance){    

      cardAppliance += `
      <li>${appliances}</li>
      `
    }
    return `
    ${cardAppliance}
    `;
  }
  return{appliance, factory}
}
 
