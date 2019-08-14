// DATE ELEMENTS
var date = document.getElementById('date');
var dateString = document.getElementById('dateString');
var day = document.getElementById('day');
var month = document.getElementById('month');
var year = document.getElementById('year');

// ADDRESS ELEMENTS
var street = document.getElementById('street');
var city = document.getElementById('city');
var state = document.getElementById('state');
var zip = document.getElementById('zip');

var form = document.getElementById('form');

// FORM VALIDATION
function throwError(e, element, errorMsg){
  e.preventDefault();
  element.className += ' error';
  element.value = "";
  element.placeholder = errorMsg;
}

// Check for blank fields
function checkBlankFields(e, element, errorMsg){
  if (element.value === ""){
    throwError(e, element, errorMsg);
  }else {
    element.className = "form-control";
  }
}

// Check for date submission
function checkDate(){
  if (month.value === "00"){
    throwError(e, month, "Enter Month");
  }
}

form.addEventListener('submit', function(e){
  checkBlankFields(e, street, 'Please enter a street address...');
  checkBlankFields(e, city, 'Please enter a city...');
  checkBlankFields(e, state, 'Enter a state...');
  checkBlankFields(e, zip, 'Please enter a zip code...');
  if (month.value === "00"){
    throwError(e, month, "Enter Month");
  }
});

// DATE FUNCTIONALITY - Update dateString
function updateDate(){
  date.placeholder = "";
  date.value = year.value + "-" + month.value + "-" + day.value;
  dateString.value = month.value + "-" + day.value + "-" + year.value;
  //console.log(date.value);
}

// Update dateString
day.addEventListener('click', function(e) {
  updateDate();
});

month.addEventListener('click', function(e) {
  updateDate();
});

year.addEventListener('click', function(e) {
  updateDate();
});
