const openBtn = document.getElementById("citySearch");
const closeBtn = document.getElementById("modal-close");
const modal = document.getElementById("modal-city");

openBtn.addEventListener("click", () => {
    modal.classList.add("open");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("open");
});

async function getCityNames(name) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name="+name;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function loadCityNames(){
    const container = document.getElementById("city-names");
    const text = document.getElementById("cityName").value;
    container.innerHTML = '<span class="loader"></span>';

    let data = await getCityNames(text);
    
    console.log(data);

    if (!data.hasOwnProperty("results")) {
        container.innerHTML = '<h5>Nazwa ma za mało znaków lub nie instnieje';
        return;
    }
    container.innerHTML = 
    '<li>'+data.results[0].name+'</li>'+
    '<li>'+data.results[1].name+'</li>'+
    '<li>'+data.results[2].name+'</li>';
    
}