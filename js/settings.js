const openBtn = document.getElementById("citySearch");
const closeBtn = document.getElementById("modal-close");
const modal = document.getElementById("modal-city");
const save = document.getElementById("save-btn");
let buttons = document.querySelectorAll('.city-button');

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

save.addEventListener("click", handleSaveButton);

function handleSaveButton(){
    const days = parseInt(document.getElementById("days").value, 10); 
    const saveMessage = document.getElementById("saveMessage"); 

    saveMessage.classList.remove("warning");
    saveMessage.classList.remove("success");

    if (isNaN(days)){
        saveMessage.classList.add("warning");
        saveMessage.innerHTML = "Proszę wpisać liczbę dni";
        return;
    }

    if (days < 1 || days > 16){
        saveMessage.classList.add("warning");
        saveMessage.innerHTML = "Liczba dni musi zawierać się w przedziale od 1 do 16";
        return;
    }

    if (typeof localStorage.getItem("cityName") == 'undefined' && localStorage.getItem("cityName") == null){
        saveMessage.classList.add("warning");
        saveMessage.innerHTML = "Proszę wybrać miasto";
        return;
    }

    localStorage.setItem("days", days);

    saveMessage.classList.add("success");
    saveMessage.innerHTML = "Dane zapisane";

    loadForecast(days); 
    
}

buttons = document.querySelectorAll('.city-button');
buttons.forEach(button => {
    button.addEventListener('click', handleCityButton)
});

function handleCityButton() {
    const cityNameLabel = document.getElementById("cityNameLabel");
    const name = this.textContent.trim();
    const lat = this.dataset.lat;
    const lon = this.dataset.lon;

    console.log("Kliknięto:", name, lat, lon); 

    localStorage.setItem("cityName", name);
    localStorage.setItem("cityLat", lat);
    localStorage.setItem("cityLon", lon);

    cityNameLabel.innerHTML = "Wybrane miasto: " + name;

    modal.classList.remove("open");
}

function handleSaveSettings() { 
    const daysInput = document.getElementById("days");
    const days = Number(daysInput.value);

    if (isNaN(days) || days < 1 || days > 16) {
        alert("Podaj liczbę dni od 1 do 16");
        return;
    }

    localStorage.setItem("forecastDays", days);

    console.log("Zapisano ustawienia:", { days });


    const modal = document.getElementById("settings");
    if (modal) modal.classList.remove("open");
}

document.querySelector(".settings-btn").addEventListener("click", handleSaveSettings);

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

async function loadCityNames() {
    const text = document.getElementById("cityName").value;

    const containers = [
        document.getElementById("city-name-1"),
        document.getElementById("city-name-2"),
        document.getElementById("city-name-3")
    ];

    containers.forEach(c => c.replaceChildren());

    const loader = document.createElement("span");
    loader.classList.add("loader");
    containers[0].replaceChildren(loader);

    const data = await getCityNames(text);

    if (!data.results) {
        const msg = document.createElement("h5");
        msg.textContent = "Brak wyników";
        containers[0].replaceChildren(msg);
        return;
    }

    data.results.slice(0, 3).forEach((city, i) => {
        const li = containers[i];
        li.replaceChildren(); 

        const btn = document.createElement("button");
        btn.classList.add("city-button");
        btn.dataset.lat = city.latitude;
        btn.dataset.lon = city.longitude;

        const nameNode = document.createTextNode(city.name + " ");

        const flag = document.createElement("span");
        flag.textContent = countryCodeToFlag(city.country_code);

        btn.appendChild(nameNode);
        btn.appendChild(flag);

        btn.addEventListener("click", handleCityButton);

        li.replaceChildren(btn);
    });
}

