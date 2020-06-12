const express = require('express')
const bodyParser = require('body-parser')
const portas = 8080;
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./controllers/playlistController')(app);
require('./controllers/songsController')(app);
require('./controllers/userController')(app);
require("./controllers/projectController")(app);

app.listen(portas,function(){
console.log("O servidor está rondando na porta: ",portas);
});