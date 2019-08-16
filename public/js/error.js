var errorMessage = document.getElementById('errorMessage');

function initializePage() {
  console.log("it did it!");
  var errorHTML = `<div class="alert alert-warning fade show" role="alert">
              <strong>Sorry!</strong> You must enter a valid Username and Password to proceed.</div>`;
  $('#errorMessage').html(errorHTML);

  // API CALL
  var APIurl = `http://localhost:3000/errorMessage`;
  $.ajax( APIurl, {
    success: function(data){
      var errorMessage = $('#errorMessage');
      var errorHTML = "Hello: " + data.message;
      console.log(data);

      $('#errorMessage').html(errorHTML); //append to gallery div
    } //end success
  });

}

initializePage();
