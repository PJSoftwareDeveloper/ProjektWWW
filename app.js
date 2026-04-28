async function loadForecast() {
    try {
        const response = await fetch("forecast.json");
        const data = await response.json();

        const container = document.querySelector(".tile-grid");
        container.innerHTML = "";

        data.weekly.forEach(day => {
            const tile = document.createElement("article");
            tile.classList.add("tile", getTimeClass(Number(day.hour)));


            tile.innerHTML = `
                <div class="day">${day.day}</div>
                <div class="tile-icon">
                    <img src="img/${day.icon}.svg" alt="${day.icon}">
                </div>
                <div class="temps">${day.max}° / ${day.min}°</div>
            `;

            container.appendChild(tile);
        });
        

    } catch (error) {
        console.error("Błąd ładowania danych pogodowych:", error);
    }
}

function getTimeClass(hour) {
    if (hour >= 5 && hour < 10) return "morning";
    if (hour >= 10 && hour < 17) return "day";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}


loadForecast();
