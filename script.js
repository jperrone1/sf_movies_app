"use strict"; 

$(function() { 

  $('#searchButton').on("click", function(e){
    e.preventDefault();
    var result = $('#searchTerm').val();
    $(".posters").empty();  

    var response = $.ajax({
      url: "http://www.omdbapi.com", 
      type: "get", 
      data: {s: result}, 
      // success: function(data){ $( ".result" ).html(data) }, 
      dataType: "json"
    });

    response.done( function (data) {
      $( ".results" ).empty();   

      $.each(data["Search"], function(index, movie) {
        $( ".results" ).append ("<li data-imdbid=" + movie["imdbID"] + ">" + movie["Title"] + ":  year = " + movie["Year"] + ",  type = " + movie["Type"] + "</li>");
      });
    });
  });

  // My goal above is to have the relevant part of the code evaluate to <li data-imdbid=tt1234567>

  $(".results").delegate ('li', 'click', function (e) {
    var id = $(e.target).data("imdbid");

    var response2 = $.ajax({
      url: "http://www.omdbapi.com", 
      type: "get", 
      data: {i: id}, 
      dataType: "json"
    });

    response2.done( function (data) {
        $( ".posters" ).empty();
        $( ".posters" ).append ("<img src=" + data["Poster"] + "/>");
    });
  });
})

/*
Take the result of the call to the omdb api and display it on the page. 
In order to do that, I need to make sure the code waits until the function is done. 
Then I need to access the elements in the object that is returned. 
In order to access the elements, I would not use the .eq() method because the information is returned as JavaScript, not a JQuery object from the DOM.  
I should examine the data structure that was returned. 
The data structure is a hash with a single key, Search, to a value which is an array of objects, with various keys like Title:, Type:, Year:, and imdbID:. 
*/

  // // click handler 
  //   .preventDefault
  // // ajax promise 
  //   type: get, 
  //   format: json, 
  // // done callback 
  //   .done
  // // data iterator
  //   each 
  // // append movie title 
  //   "<li>" +   + "</li>"
