const openBtn = document.getElementById("citySearch");
const closeBtn = document.getElementById("modal-close");
const modal = document.getElementById("modal-city");
let buttons = document.querySelectorAll('.city-button');

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

buttons = document.querySelectorAll('.city-button');
buttons.forEach(button => {
    button.addEventListener('click', handleCityButton)
});

function handleCityButton(){
    console.log('Button clicked:', this.textContent);
}

async function getWeather(name) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name="+name;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function getCityNames(name) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name="+name;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function loadCityNames(){
    const text = document.getElementById("cityName").value;
    let container = document.getElementById("city-name-1");

    for(i =0; i<3; i++){
        let container = document.getElementById("city-name-"+(i+1));
        container.innerHTML = '';
    }

    container = document.getElementById("city-name-1");
    container.innerHTML = '<span class="loader"></span>';

    let data = await getCityNames(text);

    if (!data.hasOwnProperty("results")) {
        container.innerHTML = '<h5>Nazwa ma za mało znaków lub nie instnieje';
        return;
    }

    let cityNameHTML = "";
    
    for(i =0; i<3; i++){

        container = document.getElementById("city-name-"+(i+1));
        cityNameHTML = "";

        cityNameHTML+='<button data-lat="' + data.results[i].latitude + '" data-lon="' + data.results[i].longitude + '">';
        cityNameHTML+=data.results[i].name;
        cityNameHTML+=" <span>&#x"+(data.results[i].country_code.charCodeAt(0)+127397).toString(16)+";&#x"+(data.results[i].country_code.charCodeAt(1)+127397).toString(16)+";</span>";

        cityNameHTML+='</button>';
        
        container.innerHTML = cityNameHTML
    }
    

}