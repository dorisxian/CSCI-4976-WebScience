$(document).ready(function() {
    //Forcast API Key
    var APIKEY = '0fd32af2a9449cc382bacda0facc7aa8';
    //call function to get the current location
    getLocation();

    function getLocation() {
        var output = document.getElementById("weather");
        //loading message
        output.innerHTML = "<p class='loading'><i class='fa fa-spinner fa-pulse'></i>Locating&hellip;</p>";

        if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser. =(</p>";
            return;
        }
        else{
            //get geolocation
            navigator.geolocation.getCurrentPosition(success, error);
        }

        function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;
            var geocoder;
            var city, state;

            var ForecastAPI = 'https://api.forecast.io/forecast/0fd32af2a9449cc382bacda0facc7aa8/' + latitude + ',' + longitude + "?callback=?";
            
            //get the city name
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(latitude, longitude);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        //get the full address
                        var add = results[0].formatted_address ;
                        //split the full address with "," as delimiter and get the city name
                        var value = add.split(",");
                        count = value.length;
                        //country = value[count-1];
                        state = value[count-2].substring(0,3);
                        city = value[count-3];
                    }
                    else {
                        alert("No results found");
                    }
                }
                 else {
                    alert("Geocoder failed due to: " + status);
                }
            });
            
            $.getJSON(ForecastAPI, {
                tags: "weather forecast",
                tagmode: "any",
                format: "json"
            },
              function(data) {
                console.log( "success" );
                var output = "";
                output += "<h2><i class='fa fa-map-marker'></i>" + city + ", " + state +"</h2>";
                output += "<img src='icons/" + data.currently.icon + ".png' />";
                output += "<div class='row'><div class='col-md-3'></div><div class='col-md-3'>";
                output += "<p class='temp'>" + data.currently.temperature.toFixed() + "<span class='unit'>°F</span></p>";
                output += "<h3>" + data.currently.summary + "</h3>";
                output += "</div><div class='col-md-3'>";
                output += "<section class='detailinfo'><p><span class='detail'>Humandity:</span>" + (data.currently.humidity*10).toFixed(1) + "%</p>";
                output += "<p><span class='detail'>Wind:</span>" + data.currently.windSpeed + " mph</p>";
                output += "<p><span class='detail'>Visibility:</span>" + data.currently.visibility + " mi</p></section>";
                output += "</div><div class='col-md-3'></div>"
                $('#weather').html(output);
            });
        }

        function error() {
            output.innerHTML = "Unable to retrieve your location";
        }
    }

});