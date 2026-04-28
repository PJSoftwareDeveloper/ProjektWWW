loadForecast().then(data => {
    document.querySelector("header h2").textContent = data.location.city;
    document.querySelector(".big-temp").textContent = data.current.temp + "°C";
    document.querySelector("header p").textContent = new Date().toLocaleDateString("pl-PL", { weekday: "long", day: "numeric", month: "long" });


    const stats = document.querySelector(".current-stats");
    stats.innerHTML = `
        <div class="row">
            <div>Wiatr ${data.current.wind} km/h</div>
            <div>Wilgotność ${data.current.humidity}%</div>
        </div>
        <div class="row">
            <div>Wschód ${data.current.sunrise}</div>
            <div>Zachód ${data.current.sunset}</div>
        </div>
    `;

    const grid = document.querySelector(".tile-grid");
    grid.innerHTML = "";

    data.weekly.forEach(day => {
        const tile = document.createElement("article");
        tile.classList.add("tile", getTimeClass(day.hour));

        tile.innerHTML = `
            <div class="day">${day.day}</div>
            <div class="tile-icon">
                <img src="img/${day.icon}.svg">
            </div>
            <div class="temps">${day.max}° / ${day.min}°</div>
        `;

        grid.appendChild(tile);
    });
});
