var express = require('express');
var hbs = require('hbs');
var ejs = require('ejs');
var geocode = require('./utils/geocode');
var forecast = require('./utils/forecast');
var path = require('path');
//Express server
var app = express();

const port = process.env.PORT || 3000 

app.use(express.static(path.join(__dirname,'../public')))


//set view engine
app.set('view engine', 'ejs');
app.set(express.json());



app.get('/index',(req,res) => {
    res.render('index');
})


app.get('/weather',(req,res) => {
    debugger
    if(!req.query.address)
     return res.send("Location should not be empty");
    debugger
    geocode(req.query.address,(error, geocode_result) => {
        debugger
        if(error) return res.send({error: error});
        forecast(geocode_result,(error, forecast_result) =>{
            debugger
            if(error) return  res.send({error: error});
            debugger
            res.send(forecast_result);
        });
    })
})

// app.get('*', (req, res) =>{
//     res.status(404).send("<h1>404: Page not found</h1>");
// })


app.listen(port,()=>{
    console.log('Server is up on port '+ port);
})