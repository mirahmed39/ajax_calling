// TODO: add your JavaScript here!
function filterRestaurants() {
    const location = document.querySelector('#filterLocation').value;
    const cuisine = document.querySelector('#filterCuisine').value;
    let requestURL = 'api/places';
    if (location && cuisine)
        requestURL += '?location='+location+'&cuisine='+cuisine;
    else if(location)
        requestURL += '?location='+location;
    else if(cuisine)
        requestURL += '?cuisine='+cuisine;

    const req = new XMLHttpRequest();
    req.open('GET', requestURL);
    req.addEventListener('load', function (evt) {
       //console.log("Status and response text for filter", req.status, req.responseText);
       if(req.status >= 200 && req.status < 300) {
           const restaurants = JSON.parse(req.responseText);
           // clear the table first then insert the restaurants in the table.
           clearTable();
           for(let restaurant of restaurants)
               insertRestaurant(restaurant.name, restaurant.cuisine, restaurant.location);
       }
    });
    req.send('');
}

function addRestaurants() {
    // get all the things to add
    const name = document.querySelector('#name').value;
    const cuisine = document.querySelector('#cuisine').value;
    const location = document.querySelector('#location').value;

    const req = new XMLHttpRequest();
    const requestURL = 'api/places/create';
    req.open('POST', requestURL);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    req.addEventListener('load', function (evt) {
        if(req.status >= 200 && req.status < 300) {
            console.log("Inside");
            const restaurant = JSON.parse(req.responseText);
            console.log(restaurant.error);
            if(restaurant.error === undefined) {
                // only add the restaurant if the object does not have an error key.
                // also make sure to remove the error messages if there exist(s) any.
                removeErrorMessages();
                insertRestaurant(restaurant.name, restaurant.cuisine, restaurant.location);
            } else {
                const div = document.querySelector('#errorContainer');
                const errorDiv = document.createElement('div');
                errorDiv.textContent = restaurant.error;
                errorDiv.classList.add('alert');
                errorDiv.classList.add('alert-danger');
                div.appendChild(errorDiv);
            }
        }
    });
    const requestBody = 'name='+name+'&cuisine='+cuisine+'&location='+location;
    req.send(requestBody);
}

function insertRestaurant(name, cuisine, location) {
    const tableBody = document.querySelector('#places-list');
    const rowToInsert = tableBody.appendChild(document.createElement('tr'));
    const tableData1 = rowToInsert.appendChild(document.createElement('td'));
    const tableData2 = rowToInsert.appendChild(document.createElement('td'));
    const tableData3 = rowToInsert.appendChild(document.createElement('td'));

    tableData1.appendChild(document.createTextNode(name));
    tableData2.appendChild(document.createTextNode(cuisine));
    tableData3.appendChild(document.createTextNode(location));
}

function clearTable() {
    const tableBody = document.querySelector('#places-list');
    while(tableBody.hasChildNodes())
    tableBody.removeChild(tableBody.firstChild);
}

function removeErrorMessages() {
    const errorMessageContainer = document.querySelector('#errorContainer');
    while(errorMessageContainer.hasChildNodes())
        errorMessageContainer.removeChild(errorMessageContainer.firstChild);
}

// run the main function only when all the DOM contents are loaded.
document.addEventListener('DOMContentLoaded', main);
function main() {
  const filterButton = document.querySelector('#filterBtn');
  const addButton = document.querySelector('#addBtn');

  filterButton.addEventListener('click', filterRestaurants);
  addButton.addEventListener('click', addRestaurants);
}