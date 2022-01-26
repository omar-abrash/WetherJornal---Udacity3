// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listining);

function listining() {
    console.log(`server is conectting with localhost:${port}`);
}
// :::::::::::::::::::::::::::::::::::::

// GET HTTP
app.get("/all", (req, res) => {
    res.send(projectData);
    res.end();
});

// POST HTTP
app.post("/", (req, res) => {
    // console.log(req.body);
    res.send(req.body);
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    };
    res.end();
});