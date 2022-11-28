import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
let param = search.split('=')
let adventureId = param[1]
  // Place holder for functionality to work in the Stubs
  console.log(adventureId)
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
try{
  let fetchedData = await fetch( config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId)
let dataJson = await fetchedData.json()
  // Place holder for functionality to work in the Stubs
  return dataJson;
} catch{
  return null;
}

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let title = document.getElementById("adventure-name");
  title.innerHTML =`${adventure.name}`
  let subTitle = document.getElementById("adventure-subtitle");
  subTitle.innerHTML = `${adventure.subtitle}`
 let imgarr = document.getElementById("photo-gallery");

  
adventure.images.map((img) => {
let creatElem = document.createElement("div")
creatElem.className = "activity-card-image image"
creatElem.innerHTML = `<img class="image img-responsive" src="${img}"/>`
imgarr.append(creatElem)
}) 
 let content  = document.getElementById("adventure-content");
 content.innerHTML = `${adventure.content}`
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 
  
  let picToDOM = document.getElementById("photo-gallery");
  picToDOM.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id = "carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

images.map((img, idx) => {
  let createDiv = document.createElement("div")
  createDiv.className = `carousel-item ${idx === 0 ? "active" : ""}`
  createDiv.innerHTML = `<img class="image img-responsive activity-card-image pb-3 pb-md-0" src="${img}"/>`
  
  document.getElementById("carousel-inner").append(createDiv)

})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // if(adventure.reserved == true){
  //   let showRes = document.getElementById("reservation-panel-sold-out")
  //   showRes.style.display = "block"
  // }
  console.log(adventure, "conditionalrender")
  if(adventure.available){
    let hidePanel = document.getElementById("reservation-panel-sold-out")
    hidePanel.style.display  = "none"
    let showPanel = document.getElementById("reservation-panel-available")
    showPanel.style.display = "block"
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  } 
  else{
    let hideRes = document.getElementById("reservation-panel-available")
    hideRes.style.display = "none"
    let showRes = document.getElementById("reservation-panel-sold-out")
    showRes.style.display = "block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = adventure.costPerHead * persons;
let display = document.getElementById("reservation-cost")
display.innerHTML = total

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 const form = document.getElementById("myForm");
 form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let URL = config.backendEndpoint + "/reservations/new";
  let elem = form.elements;
  const props = {
    name: elem["name"].value,
date: elem["date"].value,
person: elem["person"].value,
adventure: adventure.id
  }
  let options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
    };
    try{
      let res = await fetch(URL, options);
      if(res.ok){
        alert("Success!");
        window.location.reload();
      } else{
        let err = await res.json()
        alert(`Failed! - ${err.message}`);
      }
    }
    catch(err){
      console.log(err);
      alert("Failed - Fetch call resulted in error")
    }
 })

 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
let banner = document.getElementById("reserved-banner");
if(adventure.reserved){
  banner.style.display = "block";
} else{
  banner.style.display = "none";
}
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
