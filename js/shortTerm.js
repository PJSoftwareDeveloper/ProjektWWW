if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark");
}


loadForecast().then(data => {
    const days = Number(localStorage.getItem("forecastDays")) || 7;
    const hoursToShow = days * 24;

    const hourlyLimited = data.hourly.slice(0, hoursToShow);

    document.querySelector("header h2").textContent = data.location.city;
    document.getElementById("liczbaDni").innerHTML = `Prognoza ${localStorage.getItem("days")}-dniowa`;

    document.querySelector("header p").textContent =
        new Date().toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

    document.querySelector(".big-temp").textContent =
        data.current.temp + "°C";

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

    const list = document.querySelector(".hourly .forecast-list");
    list.replaceChildren();

    hourlyLimited.forEach(h => {

        const li = document.createElement("li");
        li.classList.add(getTimeClass(h.hour));

        const hour = document.createElement("span");
        hour.classList.add("hour");
        hour.textContent = h.time;

        const icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = `img/${h.icon}.svg`;
        icon.alt = h.desc;

        const desc = document.createElement("span");
        desc.classList.add("desc");
        desc.textContent = h.desc;

        const temp = document.createElement("span");
        temp.classList.add("temps");
        temp.textContent = `${h.temp}°`;

        li.appendChild(hour);
        li.appendChild(icon);
        li.appendChild(desc);
        li.appendChild(temp);

        list.appendChild(li);
    });
});
