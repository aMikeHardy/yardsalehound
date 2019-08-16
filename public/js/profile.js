function initializePage(){

  // Find Sales posted by User
  var APIsaleUrl = `http://localhost:3000/sales`;
  $.ajax( APIsaleUrl, {
    success: function(data){
      var salesDiv = $('#sales');
      var salesHTML = "";

      // If there are sales, build the HTML.
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
                <iframe width="300" height="300" frameborder="0" style="border:0"
                src="https://www.google.com/maps/embed/v1/place?key=${data.Myapi}&q=${sale.street}+${sale.city},${sale.state}+${sale.zip}" allowfullscreen>
                </iframe>
              </div>
          </div>
          </div>`;
          $('#sales').html(salesHTML); // append salesHTML
        });
      }else{
        // If no sales, post alert msg
        salesHTML = `<div class="alert alert-warning fade show" role="alert">
                    You have no upcoming sales listed. <a href="/list">List a Sale</a>  or  <a href="/">Find Yard Sales</a> </div>`;
        $('#sales').html(salesHTML); // append salesHTML
      }

    } //end success
  });
}

initializePage();
