//function to get user input
function userInput() {
    //grabbing input
    let location = document.getElementById("location").value.trim();

    //passing input to getLocation
    getLocation(location);
}

/// Function to fetch data and pass the user's location to the API
async function getLocation(location) {

    // Select the <p> tag and set its inner HTML to loading 
    document.querySelector('.info').innerHTML = 'Grabbing Weather...';

    //execute try catch to handle the info
    try {
        // Fetching data from the weather API
        let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days&key=RCZAKH4C4QRQ2EL87ZHPF7Y5V`);

        //if statement to make sure user enters correct location
        if (!response.ok) {
            alert(`"${location}" Invalid. Please enter valid location.`);
            document.querySelector('.info').innerHTML = '';
        }

        // Parsing response as JSON
        let data = await response.json();
        
        // Logging the data (for debugging)
        console.log(data);

        //passing data to display function
        displayWeather(data);

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to display info to user
function displayWeather(data) {
    //Extracting information
    const locationName = data.resolvedAddress; // Get the location name
    const today  = data.days[0]; // get weather from  days array
    const temperature = today.temp; //get current temp
    const timezone = data.timezone; // Get the timezone
    const Date = data.days[0]; // Get the date from days array
    const currentDate = Date.datetime; //get current date

    //making fahirenhit temperature
    const fahrenheitTemperature = (temperature * 9/5) + 32;

    // Function to display info in Celsius
    const showCelsius = () => {
        const info = `Location: ${locationName}.<br><br>
        Temperature: ${temperature.toFixed(2)}°C.<br><br>
        Timezone: ${timezone}.<br><br>
        Date: ${currentDate}.`;
        document.querySelector('.info').innerHTML = info;
    };

    // Function to display info in Fahrenheit
    const showFahrenheit = () => {
        const info = `Location: ${locationName}.<br><br>
        Temperature: ${fahrenheitTemperature.toFixed(2)}°F.<br><br>
        Timezone: ${timezone}.<br><br>
        Date: ${currentDate}.`;
        document.querySelector('.info').innerHTML = info;
    };

    //event lisetner to make celcius button work
    document.querySelector('.celcius').addEventListener("click", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        //running function on click
        showCelsius();
    });

    //event lisetner to make fahrienheit button work
    document.querySelector('.fahrinehit').addEventListener("click", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        //running function on click
        showFahrenheit();
    });

    // Initial display in Celsius
    showCelsius();
}

//event lisetner to make submit button work
document.querySelector('form').addEventListener("submit", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    //running function on click
    userInput();
});