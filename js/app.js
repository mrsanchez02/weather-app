const API = '543d7ba9a251f0d8f64ad1a1533578e0';
const inputValue = document.getElementById('inputValue');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const displayBox = document.getElementById('displayBox');

inputForm.addEventListener('submit', e => {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${API}&units=imperial`)
        .then(response => response.json())
        .then(data => {display(data); console.log(data)})
        .catch(err => {
            alert('City not found!');
            console.log(err);
        });
    inputForm.reset();
})

const display = (data) => {
    
    const weatherIcon = data.weather[0].icon;
    const cityName = data.name;
    const cityTemp = data.main.temp;
    const cityDesc = data.weather[0].description;

    displayBox.innerHTML =`
    <img class="display__icon" src="http://openweathermap.org/img/wn/${weatherIcon}@4x.png" alt="" srcset="">
    <h2 class="display__city" id="city">
        <i class="fas fa-map-marker-alt"></i> 
        ${cityName}
    </h2>
    <h3 class="display__temp" id="temp">
        <i class="fas fa-thermometer-half"></i>
        ${cityTemp.toFixed(1)} °F
    </h3>
    <p class="display__desc" id="desc"><em>
        "${cityDesc}
    "</em></p>
    `
}

window.onload = e => {
    navigator.geolocation.getCurrentPosition((position)=>{
        let latitud = position.coords.latitude.toFixed(2);
        let longitud = position.coords.longitude.toFixed(2);
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${API}&units=imperial`)
            .then(response => response.json())
            .then(data => display(data));
    })
}