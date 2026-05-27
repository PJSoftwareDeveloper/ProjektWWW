WeatherApp
Lekka, szybka i w pełni front‑endowa aplikacja pogodowa oparta o Open‑Meteo API.

Funkcje
Wyszukiwanie miasta (API geokodowania Open‑Meteo)

Aktualna pogoda (temperatura, wiatr, wilgotność, wschód/zachód)

Prognoza godzinowa (ShortTerm)

Prognoza dzienna (LongTerm)

Tygodniowe kafelki pogodowe (Index)

Ustawienia liczby dni prognozy (1–16)

Zapisywanie miasta i ustawień w localStorage

Struktura projektu
text
/project
│
├── index.html
├── shortterm.html
├── longterm.html
├── settings.html
│
├── style.css
│
├── js/
│   ├── core.js
│   ├── index.js
│   ├── shortterm.js
│   ├── longterm.js
│   └── settings.js
│
└── img/
    └── (ikony SVG pogody)
API — Open‑Meteo
Endpoint:

text
https://api.open-meteo.com/v1/forecast
Parametry:

latitude, longitude

hourly=temperature_2m,weathercode

current=temperature_2m,wind_speed_10m,relative_humidity_2m

daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weathercode

forecast_days=1–16

timezone=auto

Logika działania
Wybór miasta
Miasto wybierane jest z modala wyszukiwania.
Zapisywane w localStorage:

cityName

cityLat

cityLon

Ustawienia
Użytkownik ustawia liczbę dni prognozy (forecastDays, 1–16).
Wartość zapisywana w localStorage i używana przy wywołaniu loadForecast().

Pobieranie danych
Główna funkcja:

js
async function loadForecast(days)
Zwraca obiekt:

js
{
  location: { city },
  current: { temp, wind, humidity, sunrise, sunset },
  weekly: [...],
  hourly: [...]
}
Mapowanie kodów pogodowych
Opisy (weatherDesc)
Przykładowe mapowanie:

0 — Bezchmurnie

1 — Głównie bezchmurnie

2 — Częściowe zachmurzenie

3 — Zachmurzenie

45, 48 — Mgła / mgła szronowa

51, 53, 55 — Mżawka (lekka/umiarkowana/gęsta)

61, 63, 65 — Deszcz (lekki/umiarkowany/silny)

71, 73, 75 — Śnieg (lekki/umiarkowany/silny)

80, 81, 82 — Przelotne opady deszczu

85, 86 — Przelotne opady śniegu

95, 96, 99 — Burze (z gradem lub bez)

Ikony (iconMap)
Dopasowane do plików SVG w katalogu img/, m.in.:

clear-day.svg

clear-night.svg

partly-cloudy-day.svg

partly-cloudy-night.svg

cloudy.svg

overcast.svg

rain.svg / cloud-rain.svg

snow.svg / overcast-snow.svg

thunderstorms-rain.svg / thunderstorms-day-rain.svg

Widoki aplikacji
Index
aktualna temperatura

wiatr, wilgotność, wschód, zachód

tygodniowa prognoza w formie kafelków

ShortTerm
prognoza godzinowa

liczba godzin zależna od forecastDays (dni × 24)

LongTerm
prognoza dzienna

ikona, opis, temperatury maks./min.

Settings
wybór miasta

ustawienie liczby dni prognozy

ustawienie trybu ciemnego


Funkcje pomocnicze
getTimeClass(hour)
Zwraca klasę CSS na podstawie godziny:

morning

day

evening

night

countryCodeToFlag(code)
Generuje flagi/symbol na podstawie dwuliterowego kodu kraju.

weatherDesc(code)
Zwraca opis pogody na podstawie kodu 0–99.


Uruchomienie
Sklonuj lub pobierz projekt.

Otwórz index.html w przeglądarce.

Wybierz miasto w oknie wyszukiwania i liczbę dni.

Korzystaj z widoków: index, shortterm, longterm, settings.