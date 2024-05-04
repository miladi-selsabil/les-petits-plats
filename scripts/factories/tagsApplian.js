
export function tagAppliance(data){
  const {id, appliance} = data;
  function factory(){
    let cardAppliance = "";
    console.log("appareil", appliance);
    for(let appliances of appliance){
      cardAppliance += `
      <li>${appliances}</li>
      `
    }
    return `
    ${cardAppliance}
    `;
  }
  return{appliance, cardAppliance: factory(), factory}
}
 