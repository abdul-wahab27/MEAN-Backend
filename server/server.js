const express = require('express')  // exported express module (express is web framework used for creating REST API)
const bodyParser = require('body-parser') // exported body-parser module

const users = require('./app/routes/user.route')

// Express App

const app = express(); // created express app
const cors = require('cors')

app.use(cors())

// Parse requests of content type application
app.use(bodyParser.urlencoded({extended: true}))  // Added body-parser middleware using express's app.use() method
app.use(bodyParser.json())

// configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// connecting to the database

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() =>{
    console.log("Database connected succesfully")
}).catch(err =>{
    console.log("Database not connected", err)
    process.exit();
    
})

// define a simple route

app.get('/', (req,res) => {
res.json({"message": "Wellcome to app"})
})

// Requires Notes routes

require('./app/routes/note.route.js')(app)

// Users Route

require('./app/routes/user.route.js')(app)

require('./app/routes/login.route.js')(app)

// listen request

app.listen(3000, () =>{
    console.log("Server is listening at port 3000")
})

// What is middleware???
// -----> A middleware is function that has access to the request and response objects.
// -----> It can execute any code , transform the request object or return a response
