loadForecast().then(data => {
    document.querySelector("header h2").textContent = data.location.city;

    document.querySelector("header p").textContent = new Date().toLocaleDateString("pl-PL", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });

    document.querySelector(".big-temp").textContent =
        data.current.temp + "°C";

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

    const list = document.querySelector(".hourly .forecast-list");
    list.innerHTML = "";

    data.hourly.forEach(h => {
        const li = document.createElement("li");
        li.classList.add(getTimeClass(h.hour));

        li.innerHTML = `
            <span class="hour">${h.time}</span>
            <img class="icon" src="img/${h.icon}.svg">
            <span class="desc">${h.desc}</span>
            <span class="temps">${h.temp}°</span>
        `;

        list.appendChild(li);
    });
});
