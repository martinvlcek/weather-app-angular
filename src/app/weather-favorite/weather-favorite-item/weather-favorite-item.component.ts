import {Component, Input} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {WeatherInterface} from "../../weather";

@Component({
  selector: 'app-weather-favorite-item',
  templateUrl: './weather-favorite-item.component.html',
  styleUrls: ['./weather-favorite-item.component.scss']
})
export class WeatherFavoriteItemComponent {
  @Input() favWeather: WeatherInterface = {} as WeatherInterface

  constructor(private weatherService: WeatherService) {}

  removeWeatherFromFavorites(weather: WeatherInterface): void {
    this.weatherService.removeFromFavorites(weather)
  }
}
