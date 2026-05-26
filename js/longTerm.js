loadForecast().then(data => {
    const list = document.querySelector(".forecast-list");
    list.replaceChildren(); 

    data.weekly.forEach(day => {

        const li = document.createElement("li");
        li.classList.add(getTimeClass(day.hour));

        const daySpan = document.createElement("span");
        daySpan.classList.add("day");
        daySpan.textContent = day.day;

        const icon = document.createElement("img");
        icon.classList.add("icon");
        icon.src = `img/${day.icon}.svg`;
        icon.alt = day.desc;

        const desc = document.createElement("span");
        desc.classList.add("desc");
        desc.textContent = day.desc;

        const temps = document.createElement("span");
        temps.classList.add("temps");
        temps.textContent = `${day.max}° / ${day.min}°`;

        li.appendChild(daySpan);
        li.appendChild(icon);
        li.appendChild(desc);
        li.appendChild(temps);

        list.appendChild(li);
    });
});
