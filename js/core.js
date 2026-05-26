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
        1: "Głównie bezchmurnie",
        2: "Częściowe zachmurzenie",
        3: "Zachmurzenie",

        45: "Mgła",
        48: "Osadzająca się mgła szronowa",

        51: "Mżawka lekka",
        53: "Mżawka umiarkowana",
        55: "Mżawka gęsta",

        56: "Marznąca mżawka lekka",
        57: "Marznąca mżawka gęsta",

        61: "Lekki deszcz",
        63: "Umiarkowany deszcz",
        65: "Silny deszcz",

        66: "Lekki marznący deszcz",
        67: "Silny marznący deszcz",

        71: "Lekki śnieg",
        73: "Umiarkowany śnieg",
        75: "Silny śnieg",

        77: "Ziarnisty śnieg",

        80: "Przelotne opady deszczu lekkie",
        81: "Przelotne opady deszczu umiarkowane",
        82: "Przelotne opady deszczu intensywne",

        85: "Przelotne opady śniegu lekkie",
        86: "Przelotne opady śniegu intensywne",

        95: "Burza",
        96: "Burza z lekkim gradem",
        99: "Burza z silnym gradem"
    };

    return map[code] ?? "Pogoda";
}



async function loadForecast(days) {

    const cityName = localStorage.getItem("cityName");
    const lat = localStorage.getItem("cityLat");
    const lon = localStorage.getItem("cityLon");
    if (typeof days == 'undefined'){
        days = localStorage.getItem("days");
        if (days == null){
            days = 1
        }
    }

    if (!lat || !lon) {
        console.warn("Brak wybranego miasta");
        return null;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode&current=temperature_2m,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode&timezone=auto&forecast_days=${days}`;
    console.log(url)
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

function countryCodeToFlag(code) {
    return [...code.toUpperCase()]
        .map(c => String.fromCodePoint(c.charCodeAt(0) + 127397))
        .join('');
}


