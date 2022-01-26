/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const zipCode = document.querySelector('#zip');
const apiKey = '&appid=e0732f3078f7a69716c1fad257b38464';
// const zipCode = '94040,us'; // variable from #zip element
// use these zip codes in UI to try (25173,) (11733,) (94040,us)
const feel = document.querySelector('#feelings');
const generatButton = document.querySelector('#generate');
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const dateArea = document.querySelector('#date');
const temperaturArea = document.querySelector('#temp');
const userResponseArea = document.querySelector('#content');
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::
const weatherWeb = document.querySelector('#app');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// console.log(newDate);

// Define all async functions:
// GET API 
const getAPI = async (url, zip, key) => {
    const request = await fetch(url + zip + key);
    // console.log(response);
    try {
        const apiObject = await request.json();
        // console.log(apiObject);
        return apiObject;
    } catch (error) {
        console.log("ERROR : " + error);
    }
}
// GET HTTP:
const retrieveData = async (url) => {
    const request = await fetch(url);
    try {
        const newData = await request.json();
        
        return newData;
    } catch (error) {
        console.log("ERROR : " + error);
    }
}
// POST HTTP:
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    try {
        let newData = await response.json();
        // console.log(newData);
        return newData; 
    } catch (error) {
        console.log("ERROR", error);
    }
}


// Helper function:
// to convert temperature from K to C
function changeTemp(tempK) {
    let tempC = tempK - 273.15; 
    // console.log(tempC);
    return tempC;
}
// to change the web background depends on temperature
function designDependWithTemp(temp) {
    // console.log(tempC);
    if (temp <= 0) {
        weatherWeb.classList.add('snowing'); // snowing wither
    } else if (temp > 0 && temp <= 10) {
        weatherWeb.classList.add('cloudy'); // cloudy and raining
    } else {
        weatherWeb.classList.add('sunny');  // sunny 
    }
}


// Main Function :
function getAPIAndPostData() {
    // get the textarea value
    let feelings = feel.value; 
    // get the API 
    getAPI(baseUrl, zipCode.value, apiKey).then(function (apiData) {
        // console.log(apiData);
        // send the (apiData.main.data),(newDate)and(feelings) to server with postData
        postData("/", { temperature: apiData.main.temp, date: newDate, userResponse: feelings }).then(function (resData) {
            // console.log(resData);
            // the (resData) in here same as the data which we sent it to the server.
            // we can use it dynamically in UI
            dateArea.innerHTML = "Date : " + resData.date;
            temperaturArea.innerHTML = "Temperature : " + Math.round(changeTemp(resData.temperature)) + "&#8451";
            userResponseArea.innerHTML = "I feel : " + resData.userResponse;
            


            // we can make any thing of design 
            // change the web desing depend on temperature
            designDependWithTemp(changeTemp(resData.temperature));

            // set the resData on the projectData {} using get http  ::> retrievData("/all")
            retrieveData("/all");
        });
    });
};


// Main Event:
generatButton.addEventListener('click', getAPIAndPostData);