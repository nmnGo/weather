const express = require("express");
const https = require("https");
//http is a standard node module to excess data from ext. server already installed
var city = "Delhi";


const app = express();

const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=92dcdf71f9fd5f48614e25f8a9bfcdc9&units=metric";
// this is a url of website we want to fetch data from 
//units = metric is parameter of many thaty can be used

app.get(("/"), (req, res1) => {

    //  res1.send("<h1>Hello  Friends</h1>");

    https.get(url, (res2) => {

        res2.on("data", (data) => {
                var Wdata = JSON.parse(data) // 1
                const temp = Wdata.main.temp; //3
                const Wdes = Wdata.weather[0].description;
                const icon = Wdata.weather[0].icon;
                const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

                res1.write("The Temprature in " + city + " is " + temp + " kelvin ");
                res1.write(" . Conditions are bit  " + Wdes);
                res1.send(); // sends all response.write();
            }) //2
    })

})

app.listen(3000);


//http://api.openweathermap.org/data/2.5/weather?q=London&appid=92dcdf71f9fd5f48614e25f8a9bfcdc9
//My api key 92dcdf71f9fd5f48614e25f8a9bfcdc9
//1. used to convert (possibly) different
//format into readable 
//2.if you see the terminal you have got status code 200 ie "Success"
// after doing this console.log(res2)
//3. console.log("Wdata") the u know we are traversing the object