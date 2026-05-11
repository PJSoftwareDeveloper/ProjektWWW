function getTimeClass(hour) {
    hour = Number(hour);
    if (hour >= 5 && hour < 10) return "morning";
    if (hour >= 10 && hour < 17) return "day";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}

function weatherDesc(code) {
    const map = {
        0: "Bezchmurnie",
        1: "Częściowe zachmurzenie",
        2: "Częściowe zachmurzenie",
        3: "Zachmurzenie",
        45: "Mgła",
        48: "Mgła",
        51: "Mżawka",
        61: "Deszcz",
        80: "Przelotny deszcz",
        95: "Burza"
    };
    return map[code] ?? "Pogoda";
}


async function loadForecast() {

    const cityName = localStorage.getItem("cityName");
    const lat = localStorage.getItem("cityLat");
    const lon = localStorage.getItem("cityLon");

    if (!lat || !lon) {
        console.warn("Brak wybranego miasta");
        return null;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&timezone=auto`;

    const response = await fetch(url);
    const data = await response.json();

    const iconMap = {
        0: "clear-day",
        1: "partly-cloudy-day",
        2: "partly-cloudy-day",
        3: "cloudy",
        45: "fog",
        48: "fog",
        51: "rain",
        61: "rain",
        80: "rain",
        95: "thunderstorm"
    };

    const formatted = {
        location: {
            city: cityName
        },
        current: {
            temp: data.current.temperature_2m,
            wind: data.current.wind_speed_10m,
            humidity: data.current.relative_humidity_2m,
            sunrise: data.daily.sunrise[0].split("T")[1],
            sunset: data.daily.sunset[0].split("T")[1]
        },
        
        weekly: data.daily.time.map((date, i) => ({
            day: new Date(date).toLocaleDateString("pl-PL", { weekday: "short" }),
            icon: iconMap[data.daily.weathercode[i]] ?? "cloudy",
            max: data.daily.temperature_2m_max[i],
            min: data.daily.temperature_2m_min[i],
            desc: weatherDesc(data.daily.weathercode[i])
        })),
        hourly: data.hourly.time.map((t, i) => ({
            time: t.split("T")[1].slice(0, 5),
            temp: data.hourly.temperature_2m[i],
            icon: iconMap[data.hourly.weathercode[i]] ?? "cloudy",
            desc: weatherDesc(data.hourly.weathercode[i]),
            hour: Number(t.split("T")[1].slice(0, 2))
        }))
    };

    return formatted;
}

