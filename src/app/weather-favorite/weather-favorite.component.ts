import {Component, OnInit} from '@angular/core';
import {WeatherInterface} from "../weather";
import {WeatherService} from "../weather.service";
import {map, Observable} from "rxjs";
import {sortByName} from "../helpers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-weather-favorite',
  templateUrl: './weather-favorite.component.html',
  styleUrls: ['./weather-favorite.component.scss']
})
export class WeatherFavoriteComponent implements OnInit {
  constructor(
    private router: Router,
    private weatherService: WeatherService
  ) {}

  favWeathers$: Observable<WeatherInterface[]> = this.weatherService.getStoredWeatherData()
    .pipe(
      map((weather: WeatherInterface[]) => weather
        .slice()
        .sort(sortByName))
    )

  ngOnInit() {
    this.weatherService.fetchStoredWeatherData().subscribe()
  }

  goToDetail(weather: WeatherInterface): void {
    this.router.navigate([`/detail/${weather.id}`]);
  }
}

