loadForecast().then(data => {
    const list = document.querySelector(".forecast-list");
    list.innerHTML = "";

    data.weekly.forEach(day => {
        const li = document.createElement("li");
        li.classList.add(getTimeClass(day.hour));

        li.innerHTML = `
            <span class="day">${day.day}</span>
            <img class="icon" src="img/${day.icon}.svg">
            <span class="desc">${day.desc}</span>
            <span class="temps">${day.max}° / ${day.min}°</span>
        `;

        list.appendChild(li);
    });
});
