import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WeatherInterface} from "../weather";
import {WeatherService} from "../weather.service";
import {removeDiacritics} from "../helpers";

@Component({
  selector: 'app-weather-main',
  templateUrl: './weather-main.component.html',
  styleUrls: ['./weather-main.component.scss']
})
export class WeatherMainComponent implements OnInit, OnChanges {
  @Input() searchValue?: string = ''
  @Input() selectedWeather?: WeatherInterface | null
  @Input() isDetail: boolean = false
  @Output() emitFiveDaysForecast: EventEmitter<number> = new EventEmitter<number>()

  alreadyInFavorites: boolean = false
  disabledButton: boolean = false

  title: string = "only test title"

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if (!this.selectedWeather) return;

    this.weatherService.storedWeatherData$
      .subscribe((data: WeatherInterface[]) => {
        this.alreadyInFavorites = data.some((item: WeatherInterface): boolean => item.id === this.selectedWeather?.id);
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes["searchValue"]) return;

    this.weatherService.storedWeatherData$
      .subscribe((data: WeatherInterface[]) => {
        this.alreadyInFavorites = data.some((item: WeatherInterface): boolean => removeDiacritics(item.name) === changes["searchValue"].currentValue);
      })
  }

  addWeatherToFavorites(weather: WeatherInterface): void {
    this.weatherService.addToFavorites(weather)
  }

  removeWeatherFromFavorites(weather: WeatherInterface): void {
    this.weatherService.removeFromFavorites(weather)
  }

  fiveDaysForecast(weather: WeatherInterface): void {
    this.emitFiveDaysForecast.emit(weather.id)
  }
}
