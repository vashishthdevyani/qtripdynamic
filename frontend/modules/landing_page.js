import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  let fetchedCities = await fetch( config.backendEndpoint + "/cities");
  let dataJson = await fetchedCities.json();
  console.log(dataJson);
//fetch('http://example.com/movies.json')
// .then((response) => response.json())
// .then((data) => console.log(data));

return dataJson;
} catch {
  return null;
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let htmlFormat  = document.createElement("div");
   htmlFormat.className = "col-12 col-sm-6 col-lg-3 mb-3";

   let innerHtml = `<a href="pages/adventures/?city=${id}" id="${id}">
   <div class="tile">
       <div class="tile-text text-center">
       <h3>${city}</h3>
   <p>${description}</p></div>
   <img class ="img-responsive" src="${image}">
   </div>
</a>`;

htmlFormat.innerHTML = innerHtml;
document.getElementById("data").appendChild(htmlFormat);






   htmlFormat.innerHTML = innerHtml;
document.getElementById("data").appendChild(htmlFormat);



}

export { init, fetchCities, addCityToDOM };
