$(document).ready(function() {

  var lat;
  var long;
  var acc;
  var newCity;
  var newFlickr;

  //Google Geolocation  API 
  var apiGeoLoc = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCFOE8zTits_NfmJbMm63aodTBCKfIKQV0"
  $.post(apiGeoLoc, function(data) {
    lat = data.location.lat;
    long = data.location.lng;
    acc = data.accuracy;
    console.log(data);

    //Weather API  APIXU.com          
    var api = "https://api.apixu.com/v1/current.json?key=5e611d8e607a45c9aa4170646170103&q=" + lat + "," + long;

    //JSON call APIXU.com Weather API
    $.getJSON(api, function(data) {

      var city = data.location.name;
      var region = data.location.region;
      var date = data.location.localtime;
      var iconSrc = "https:" + data.current.condition.icon;
      var description = data.current.condition.text;
      var tempC = data.current.temp_c;
      var tempF = data.current.temp_f;
      var windK = data.current.wind_kph;
      var windM = data.current.wind_mph;
      var humidity = data.current.humidity;
      $("#city").html(city);
      $("#borough").html(region);
      $("#dateTime").html(date);
      $("#icon").attr("src", iconSrc);
      $("#description").html(description);
      $("#temp").html(tempC + "°C");
      $("#wind").html("Wind Speed: " + windK + " Km/h")
      $("#humidity").html("Humidity: " + humidity + " %");

      //Flickr Background Image Api       

      var apiFlickrKey = "bb6dd9ad2cfc8a2ddd68be943ec30136";
      var apiFlickr = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiFlickrKey + "&accuracy=11&safe_search=1&group_id=1463451@N25&has_geo=&geo_context=&lat=" + lat + "&lon=" + long + "&radius=5&extras=geo&per_page=50&format=json&nojsoncallback=1";

      $.getJSON(apiFlickr, function(data) {

        var totalPhotos = data.photos.photo.length;
        var randomPhoto = Math.floor(Math.random() * totalPhotos) + 0;
        var photoID = data.photos.photo[randomPhoto];
        var id = photoID.id;
        var farmID = photoID.farm;
        var secretID = photoID.secret;
        var serverID = photoID.server;
        var bckgdImage = "https://farm" + farmID + ".staticflickr.com/" + serverID + "/" + id + "_" + secretID + "_b.jpg";

        console.log(totalPhotos);
        console.log(apiFlickr);

        $("body").css("background-image", "url(" + bckgdImage + ")");


                 //Conditional function for metric/imperial Wind Speed display 
        $("#metric").click(function() {
   
          $("#temp").html(tempC + "°C");
          $("#wind").html("Wind Speed: " + windK + " Km/h");
          });

          //Conditional function for metric/imperial temp display    
          $("#imperial").click(function() {
      
            $("#temp").html(tempF + "°F");
            $("#wind").html("Wind Speed: " + windM + " mi/h");

                  });

            //New City Function    

            $("#newLocation").click(function() {
              newCity = $("input").val();

              var apiNewCity = "https://api.apixu.com/v1/current.json?key=5e611d8e607a45c9aa4170646170103&q=" + newCity;
              var newFlickr = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.places%20where%20text%3D%22" + newCity + "%22&format=json&diagnostics=true&callback=";

              $.getJSON(apiNewCity, function(data) {
                var newRegion = data.location.region;
                var newTempC = data.current.temp_c;
                var newTempF = data.current.temp_f;
                var newDate = data.location.localtime;
                var newIconSrc = "https:" + data.current.condition.icon;
                var newWindK = data.current.wind_kph;
                var newWindM = data.current.wind_mph;
                var newHumidity = data.current.humidity;
                var newDescription = data.current.condition.text;
                $("#city").html(newCity);
                $("#borough").html(newRegion);
                $("#dateTime").html(newDate);
                $("#icon").attr("src", newIconSrc);
                $("#description").html(newDescription);
                $("#temp").html(newTempC + "°C");
                $("#wind").html("Wind Speed: " + newWindK + " Km/h")
                $("#humidity").html("Humidity: " + newHumidity + " %");

                //New Location Photo

                var woeID;
                var woeAPI = "https://query.yahooapis.com/v1/public/yql?q=select+*+from+geo.places+where+text='" + newCity + "'&format=json&diagnostics=true&callback=";

                $.getJSON(woeAPI, function(data) {
                  var woeID = data.query.results.place[0].woeid;

                  console.log(woeAPI);
                  console.log(data);
                  console.log(woeID);

                  // New WOE FLickr Photo                  

                  var woePhotos = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + apiFlickrKey + "&group_id=1463451%40N25&woe_id=" + woeID + "&per_page=50&format=json&nojsoncallback=1";
                  console.log(woePhotos);
                  
                  $.getJSON(woePhotos, function(data) {

                    var newTotalPhotos = data.photos.photo.length;
                    var newRandomPhoto = Math.floor(Math.random() * totalPhotos) + 0;
                    var newPhotoID = data.photos.photo[randomPhoto];
                    var newId = newPhotoID.id;
                    var newFarmID = newPhotoID.farm;
                    var newSecretID = newPhotoID.secret;
                    var newServerID = newPhotoID.server;
                    var newBckgdImage = "https://farm" + newFarmID + ".staticflickr.com/" + newServerID + "/" + newId + "_" + newSecretID + "_b.jpg";

                    console.log(newBckgdImage);
                    

                    $("body").css("background-image", "url(" + newBckgdImage + ")");
                   
                
              });
            });
          });
        });
      });
    });
  });
});