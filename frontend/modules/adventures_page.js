import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  //let getCity = search.toString();
  let getCity = search.split("=")[1];
  console.log(getCity);
  return getCity;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
    //city = getCityFromURL();
    let fetchedCities = await fetch(
      config.backendEndpoint + "/adventures?city=" + city
    );
    let dataJson = await fetchedCities.json();
    console.log(dataJson);
    //console.log(dataJson);
    return dataJson;
  } catch {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((element) => {
    let elem = document.createElement("div");
    elem.className = "col-6 col-lg-3 mb-3";
    let innerHTML = ` 
      <a href="detail/?adventure=${element.id}" id ="${element.id}">
        <div class="activity-card">
       
          <div class = "category-banner">${element.category}</div>
           <img class ="img-responsive" src="${element.image}"/>
         

    
         <div class="activity-card-text text-md-center w-100 mt-2">
         <div class="d-block d-md-flex justify-content-between  pl-3 pr-3">
         <h5 class="text-left">${element.name}</h5>
         <p class="card-text text-right">₹${element.costPerHead}</p>
       </div>
       <div class="d-block d-md-flex justify-content-between flex-wrap"> 
         <h5 class="text-left">Duration</h5>
         <p class="card-text text-right">${element.duration} Hours</p>
 
         </div>
         </div>

        </div>
      </a>`;

    elem.innerHTML = innerHTML;
    console.log(elem.innerHTML);
    document.getElementById("data").append(elem);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredString = [];
  let Low = parseInt(low);
  let High = parseInt(high);
  list.filter((element) => {
    if (element.duration >= Low && element.duration <= High) {
      filteredString.push(element);
      console.log(filteredString);
    }
  });
  return filteredString;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  categoryList.forEach((ele) => {
    list.forEach((element) => {
      if (element.category === ele) {
        filteredList.push(element);
      }
    });
  });
  console.log(filteredList);
  return filteredList;
}
//list.filter((element) => {
//list.includes(element.category)
//filteredList.push(element)
// })
// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //let filteredList = []
  //   if(filters["duration"].length > 0 && filters["category"].length > 0){
  //   let splitArr = filters["duration"].split("-");
  // let x = filterByDuration(list, splitArr[0], splitArr[1]);
  //        let y = filterByCategory(list, filters["category"]);
  //       //  filteredList.push(x);
  //       //  filteredList.push(y);
  //     let filteredList = x.concat(y)
  //        return filteredList;
  //   }
  //        else if(filters["duration"].length > 0){
  //           let splitArr = filters["duration"].split("-");
  //              filteredList =  filterByDuration(list, splitArr[0], splitArr[1]);
  //                   return filteredList;

  // } else if(filters["category"].length > 0){
  //   filteredList =   filterByCategory(list, filters["category"]);
  //   return filteredList;
  if (filters.category.length != 0 && filters.duration.length != 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  }
  if (filters.category.length != 0) {
    return filterByCategory(list, filters.category);
  }
  if (filters.duration.length != 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);
  } else {
    return list;
  }
  // Place holder for functionality to work in the Stubs
  //   console.log(filteredList)
  //   return filteredList;
  //  }
}
//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  //  filters = {category: [], duration: "" };
  filters["category"].forEach((element) => {
    let box = document.createElement("div");
    box.className = "category-filter";
    box.innerHTML = `<div>${element}</div>`;
    document.getElementById("category-list").append(box);
  });
  //  document.getElementById("duration-select").value = filters.duration
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
