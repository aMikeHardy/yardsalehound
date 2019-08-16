var btnSearch = document.getElementById('search');

var APIkey2 = '8cb8883f29b0140d6cb97f48759d642c'

btnSearch.addEventListener('click', function(e){
  var zip = document.getElementById('zip').value;

  // Weather API Call
  var APIurl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&zip=${zip}&APPID=${APIkey2}`;

  $.ajax( APIurl, {
    success: function(data){
      var weather = $('#weather');
      var weatherHTML = " ";
      //build HTML to insert
      weatherHTML += "<div class='text-center'><h4 class='text-info'>Today's Weather</h4>";
      weatherHTML += "<div><h4 class='display-3'>" + Math.round(data.main.temp) + "</h4>";
      weatherHTML += "<div><strong>" + data.name + "</strong>";
      weatherHTML += `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png'><hr/>`

      // append HTML to gallery div
      $('#weather').html(weatherHTML);
    } //end success
  });

  // Maps API Call
  var APIsaleUrl = `http://localhost:3000/sales/${zip}`;
  $.ajax( APIsaleUrl, {
    success: function(data){
      var salesDiv = $('#sales');
      var salesHTML = "";

      // Build the HTML string
      if(data.sales.length > 0){
        $.each(data.sales, function(i, sale){
          salesHTML += `
          <div class="container ">
            <div class="row bg-white p-5 mb-3">
              <div class="col-lg">
              <h5 class="text-info">${sale.dateString}</h5><p><strong>Starts:</strong> ${sale.start} <strong>Ends:</strong> ${sale.end}</p>
              <p><strong>Address:</strong><br>${sale.street} ${sale.city}, ${sale.state} ${sale.zip}</p>
              <p><strong>Featured Items:</strong><br> ${sale.description}</p>
              <br>
              </div>

              <div class="col-lg text-center mx-auto" id="maps" style="height: 100%; margin: 0; padding: 0;">
                <iframe max-width="100%" width="100%" frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=${data.Myapi}&q=${sale.street}+${sale.city},${sale.state}+${sale.zip}" allowfullscreen>
                </iframe>
              </div>
          </div>
          </div>`;
          $('#sales').html(salesHTML);
        });
      }else{
        // Notify that no sales were found
        salesHTML = `<div class="alert alert-warning fade show" role="alert">
                    <strong>Sorry!</strong> There are no sales listed for zip code: ${zip}</div>`;
        $('#sales').html(salesHTML);
      }
    } //end success
  });


});// end btnSearch event
































//----------------------TESTING BELOW -------------------

// var test = document.getElementById('test');
//
// test.addEventListener('click', function(e){
//   console.log("it did it!");
//   test.style.color = 'blue';
//   test.innerHTML = "Hello World!";
// });

// function initializePage() {
//   //test.style.display = 'none';
//
// }
//
// initializePage();
