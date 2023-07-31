import {Component, Input} from '@angular/core';
import {WeatherInterface} from "../weather";

@Component({
  selector: 'app-weather-extended',
  templateUrl: './weather-extended.component.html',
  styleUrls: ['./weather-extended.component.scss']
})
export class WeatherExtendedComponent {
  @Input() fiveDaysForecastData: WeatherInterface[] = []
}
