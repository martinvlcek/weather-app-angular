import {Component} from '@angular/core';
import {WeatherInterface} from "../../weather";
import {WeatherService} from "../../weather.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent {
  searchValue: string = ''
  fiveDaysForecastData: WeatherInterface[] = []
  weather$: Observable<WeatherInterface | null> = this.weatherService.getWeatherData()

  constructor(private weatherService: WeatherService) {}

  handleSearchValue(event: string): void {
    this.searchValue = event;
    this.fiveDaysForecastData = []
  }

  handleFiveDaysForecast(value: number): void {
    this.weatherService.weatherDataApiCall(value, false, false).subscribe(
      (data: any) => {
        this.fiveDaysForecastData = data.list
      }
    )
  }
}
