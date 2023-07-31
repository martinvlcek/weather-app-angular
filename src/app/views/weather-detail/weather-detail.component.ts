import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../weather.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WeatherInterface} from "../../weather";

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {
  selectedWeather?: WeatherInterface
  fiveDaysForecastData: WeatherInterface[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.weatherService.fetchWeatherDataById(this.route.snapshot.params['id']).subscribe(
      (data: WeatherInterface) => this.selectedWeather = data
    )

    this.weatherService.fetchFiveDaysWeatherDataById(this.route.snapshot.params['id']).subscribe(
      (data: any) => this.fiveDaysForecastData = data.list
    )
  }

  handleFiveDaysForecast(value: string): void {
    this.weatherService.fetchFiveDaysWeatherData(value).subscribe(
      (data: any) => {
        this.fiveDaysForecastData = data.list
      }
    )
  }

  goToHome(): void {
    this.router.navigate([`/`]);
  }
}
