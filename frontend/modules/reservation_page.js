import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
  let fetchRes = await fetch(config.backendEndpoint + "/reservations/");
  let dataJson = await fetchRes.json();
console.log(dataJson)
return dataJson;
} catch(err){
  console.log("Error")
  return null;
}

  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  let tableData = document.getElementById("reservation-table")
//   let dataDate = new Date();
// let str = dataDate.toLocaleDateString("en-IN")
// let dd = dataDate.getDate();
// if(dd< 10){
//   dd = '0' + dd
// }
// let mm = dataDate.getMonth()+1;
// if(mm< 10){
//   mm = '0' + mm
// }
// let yy = dataDate.getFullYear();
// let dateFetch = dd + '/' + mm + '/' + yy


reservations.map((elem) => {
let subRow = document.createElement("tr");

subRow.innerHTML = `
<td>${elem.id}</td>
<td>${elem.name}</td>
<td>${elem.adventureName}</td>
<td>${elem.person}</td>
<td>${new Date(elem.date).toLocaleDateString("en-IN")}</td> 
<td>${elem.price}</td>

<td>${new Date(elem.time).toLocaleString("en-IN", 
{
  year: "numeric",
  month:  "long",
  day: "numeric"


})+", "+ new Date(elem.time).toLocaleTimeString().toLowerCase()}</td>
<td><div class= "reservation-visit-button" id = ${elem.id}>
<a href = "../detail/?adventure=${elem.adventure}">Visit Adventure</a></div></td>





`

tableData.append(subRow)
})
  //Conditionally render the no-reservation-banner and reservation-table-parent
  let banner = document.getElementById("no-reservation-banner")
  let banner2 = document.getElementById("reservation-table-parent")
if(reservations.length>0){
banner.style.display = "none"
banner2.style.display = "block"
} else{
  banner.style.display = "block"
banner2.style.display = "none"
}
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
