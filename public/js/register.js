
var name = document.getElementById('nameField');
var email = document.getElementById('email');
var password = document.getElementById('password');
var passwordVerify = document.getElementById('passwordVerify');

var form = document.getElementById('form');

// FORM VALIDATION
function throwError(e, element, errorMsg){
  e.preventDefault();
  element.className += ' error';
  element.value = "";
  element.placeholder = errorMsg;
}

function checkBlankFields(e, element, errorMsg){
  if (element.value === ""){
    throwError(e, element, errorMsg);
  }else{
    element.className = "form-control";
  }
}

form.addEventListener('submit', function(e) {
  checkBlankFields(e, nameField, 'Please enter your name...');
  checkBlankFields(e, email, 'Please enter your email...');
  checkBlankFields(e, password, 'Enter a password...');
  checkBlankFields(e, passwordVerify, 'Please confirm your password...');

  if(password.value !== passwordVerify.value){
    throwError(e, passwordVerify, 'Passwords do not match');
  }

});
