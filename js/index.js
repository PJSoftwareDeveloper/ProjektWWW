if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark");
}


loadForecast(7).then(data => {

    document.querySelector("header h2").textContent = data.location.city;
    document.querySelector(".big-temp").textContent = data.current.temp + "°C";
    document.querySelector("header p").textContent =
        new Date().toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

    const stats = document.querySelector(".current-stats");
    stats.replaceChildren();

    const row1 = document.createElement("div");
    row1.classList.add("row");

    const wind = document.createElement("div");
    wind.textContent = `Wiatr ${data.current.wind} km/h`;

    const humidity = document.createElement("div");
    humidity.textContent = `Wilgotność ${data.current.humidity}%`;

    row1.appendChild(wind);
    row1.appendChild(humidity);

    const row2 = document.createElement("div");
    row2.classList.add("row");

    const sunrise = document.createElement("div");
    sunrise.textContent = `Wschód ${data.current.sunrise}`;

    const sunset = document.createElement("div");
    sunset.textContent = `Zachód ${data.current.sunset}`;

    row2.appendChild(sunrise);
    row2.appendChild(sunset);

    stats.appendChild(row1);
    stats.appendChild(row2);

    const grid = document.querySelector(".tile-grid");
    grid.replaceChildren();

    data.weekly.forEach(day => {

        const tile = document.createElement("article");
        tile.classList.add("tile", getTimeClass(day.hour));

        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = day.day;

        const iconWrap = document.createElement("div");
        iconWrap.classList.add("tile-icon");

        const icon = document.createElement("img");
        icon.src = `img/${day.icon}.svg`;
        icon.alt = day.desc;

        iconWrap.appendChild(icon);

        const temps = document.createElement("div");
        temps.classList.add("temps");
        temps.textContent = `${day.max}° / ${day.min}°`;

        tile.appendChild(dayDiv);
        tile.appendChild(iconWrap);
        tile.appendChild(temps);

        grid.appendChild(tile);
    });
});
