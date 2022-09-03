const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true })); // for getting values from main page


app.get("/", (req, res1) => {
    res1.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    // console.log(req.body.cityName); gets entered city
    var city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=92dcdf71f9fd5f48614e25f8a9bfcdc9&units=metric";

    https.get(url, (res2) => {

        res2.on("data", (data) => {
            var Wdata = JSON.parse(data)
            const temp = Wdata.main.temp;
            const Wdes = Wdata.weather[0].description;
            const icon = Wdata.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>The Temprature in " + city + " is " + temp + " deg </h1>");
            res.write(" .<p>Conditions Are    " + Wdes + " </p>  ");
            res.write("<h1><img src=" + imgUrl + "></h1>")
            res.send();
        })
    })
});

app.listen(3000);