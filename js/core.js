async function loadForecast() {
    const response = await fetch("data/forecast.json");
    return await response.json();
}

function getTimeClass(hour) {
    hour = Number(hour);
    if (hour >= 5 && hour < 10) return "morning";
    if (hour >= 10 && hour < 17) return "day";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}
