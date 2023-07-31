import {WeatherInterface} from "./weather";

export function sortByStoredIds(a: WeatherInterface, b: WeatherInterface) {
  return a.name.localeCompare(b.name)
}

export function addValueToLocaleStorage(value: WeatherInterface): void {
  if (localStorage.getItem("weather")) {
    localStorage.setItem("weather", localStorage.getItem("weather") + ";" + value.id)
  } else {
    localStorage.setItem("weather", value.id.toString())
  }
}

export function removeValueFromLocaleStorage(value: WeatherInterface[]): void {
  if (value.length) {
    let citiesIds: string = "";

    value.map((d: WeatherInterface, i: number) => i === 0 ? citiesIds = d.id.toString() : citiesIds +=  ";" + d.id.toString())
    localStorage.setItem("weather", citiesIds.trim());
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
