import {Component, EventEmitter, Output} from '@angular/core';
import {WeatherService} from "../weather.service";
import {removeDiacritics} from "../helpers";

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent {
  @Output() emitSearchValue: EventEmitter<string> = new EventEmitter<string>()

  constructor(private weatherService: WeatherService) {}

  search(query: string): any {
    this.weatherService.fetchWeatherData(removeDiacritics(query)).subscribe()
    this.emitSearchValue.emit(removeDiacritics(query))
  }
}
