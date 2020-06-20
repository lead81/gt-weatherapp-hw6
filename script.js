// create global variable to pull array info for 5 day
var myData;

$(document).ready(function () {
	// hide the Icon
	document.getElementById("wicon").style.display = "none";
	//Take in city 
  $("#city").focusout(function () {
    var city = $(this).val();
    var d = new Date();
	
  
// pull info for current weather of city and fill in what is needed
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=d10600eba1b72e6a815d376ea2b53260",
      type: "GET",
      dataType: "json",

      success: function (data) {
        document.getElementById("city-name").innerHTML = city;
        document.getElementById("dt").innerHTML =
          +d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
        var iconcode = data.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $("#wicon").attr("src", iconurl);
        document.getElementById("temp").innerHTML = data.main.temp + "°F";
        document.getElementById("humidity").innerHTML =
          data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + "MPH";
        // document.getElementById("index").innerHTML = data.main.temp;
        console.log(data);
        myData = data;
      },
    });

	//pull info for 5 day forecast
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=d10600eba1b72e6a815d376ea2b53260",
      type: "GET",
      dataType: "json",
      success: function (data) {
        myData = data;
        console.log(data);
// go through 5 day array 
        for (let i = 4; i < data.list.length; i = i + 8) {
          const temp = data.list[i];
//set each day to its own div
          var weather = `
						<div class="media">
						    <p> ${temp.dt_txt} </p>
							<img src="http://openweathermap.org/img/w/${temp.weather[0].icon}.png" class="media-object" style="width:80px">
							<p> Temp: <span id="day-one-temp"> ${temp.main.temp} </span>  </p>
							<p> Humidity: <span id="day-one-hum"> ${temp.main.humidity} </span>  </p>
						</div>`;

          $("#forcast").append(weather);
        }
      },
    });
  });
});


  
// 	var place = document.querySelector("#city").value;
// 	// var citiesLog =  localStorage.getItem("citiesLog");
  
// 	if (place === "") {
// 	  displayMessage("error", "Enter valid city");
// 	} 
// 	else {
	  
  
// 	  localStorage.setItem("city", email);
	  
// 	  renderLastRegistered();
// 	}
//   });


// function renderLastSearch() {
// 	var email = localStorage.getItem("email");
// 	var password = localStorage.getItem("password");
  
// 	if (!email || !password) {
// 	  return;
// 	}

// function localStorageCheck() {
//   var citiesLog =  localStorage.getItem("citiesLog");

//   if (citiesLog) {
//     var cities = citiesLog.split(",");
//     if (!cities.includes(city)) {
//       cities.push(city);
//     }
  
//   $("#log").html("");
//   cities.forEach((place) => {
//     $("#log").append(`<h5>${place}</h5>`);
//   });
// }
// }
