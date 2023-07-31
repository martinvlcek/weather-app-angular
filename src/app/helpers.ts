import {WeatherInterface} from "./weather";

export function sortByName(a: WeatherInterface, b: WeatherInterface) {
  return a.name.localeCompare(b.name)
}

export function addValueToLocaleStorage(value: WeatherInterface): void {
  if (localStorage.getItem("weather")) {
    localStorage.setItem("weather", localStorage.getItem("weather") + ";" + value.name)
  } else {
    localStorage.setItem("weather", value.name)
  }
}

export function removeValueFromLocaleStorage(value: WeatherInterface[]): void {
  if (value.length) {
    let citiesNames: string = "";

    value.map((d: WeatherInterface, i: number) => i === 0 ? citiesNames = d.name : citiesNames +=  ";" + d.name)
    localStorage.setItem("weather", citiesNames.trim());
  } else {
    localStorage.setItem("weather", "");
  }
}

export function removeDiacritics(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function formatDate(weather: WeatherInterface): string {
  const dateObj = new Date(weather.dt * 1000);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');

  return `${dayName.slice(0, 3)}, ${hours}:${minutes}`;
}
