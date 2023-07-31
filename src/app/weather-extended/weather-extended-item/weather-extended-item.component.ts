import {Component, Input} from '@angular/core';
import {formatDate} from "../../helpers";
import {WeatherInterface} from "../../weather";

@Component({
  selector: 'app-weather-extended-item',
  templateUrl: './weather-extended-item.component.html',
  styleUrls: ['./weather-extended-item.component.scss']
})
export class WeatherExtendedItemComponent {
  @Input() weather: WeatherInterface = {} as WeatherInterface

  protected readonly formatDate = formatDate;
}
