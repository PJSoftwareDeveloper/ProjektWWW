if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("dark");
}

loadForecast().then(data => {
    const days = Number(localStorage.getItem("forecastDays")) || 7;
    const hoursToShow = days * 24;
    const hourlyLimited = data.hourly.slice(0, hoursToShow);

    document.querySelector("header h2").textContent = data.location.city;
    document.getElementById("liczbaDni").innerHTML = `Prognoza ${localStorage.getItem("days")}-dniowa`;

    document.querySelector("header p").textContent = new Date().toLocaleDateString("pl-PL", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    document.querySelector(".big-temp").textContent = data.current.temp + "°C";

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

    const container = document.querySelector(".hourly");
    
    const padding = 40;
    const height = 250;
    const width = Math.max(600, hourlyLimited.length * 45);

    const temps = hourlyLimited.map(h => h.temp);
    const minTemp = Math.min(...temps) - 2;
    const maxTemp = Math.max(...temps) + 2;
    const range = maxTemp - minTemp;

    const stepX = (width - 2 * padding) / (hourlyLimited.length - 1 || 1);

    let points = "";
    let elements = "";

    hourlyLimited.forEach((h, i) => {
        const x = padding + i * stepX;
        const y = height - padding - ((h.temp - minTemp) / range) * (height - 2 * padding);
        
        points += `${x},${y} `;
        
        elements += `<circle cx="${x}" cy="${y}" r="4" fill="#3b82f6" />`;
        elements += `<text x="${x}" y="${y - 12}" fill="currentColor" font-size="12" text-anchor="middle">${h.temp}°</text>`;
        elements += `<text x="${x}" y="${height - 10}" fill="currentColor" font-size="12" text-anchor="middle">${h.time}</text>`;
    });

    const svgHTML = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="min-width: ${width}px; height: ${height}px; display: block; overflow: visible;"><polyline fill="none" stroke="#3b82f6" stroke-width="3" points="${points.trim()}" />${elements}</svg>`;

    const wrapper = document.createElement("div");
    wrapper.style.overflowX = "auto";
    wrapper.innerHTML = svgHTML;

    container.appendChild(wrapper);
});