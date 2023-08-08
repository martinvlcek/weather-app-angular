import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { WeatherSearchComponent } from './weather-search.component'
import {HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {WeatherService} from "../weather.service";
import {WeatherInterface} from "../weather";

describe('WeatherSearchComponent', () => {
  let component: WeatherSearchComponent;
  let fixture: ComponentFixture<WeatherSearchComponent>;
  let httpMock: HttpTestingController;
  let weatherService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      declarations: [WeatherSearchComponent]
    });
    fixture = TestBed.createComponent(WeatherSearchComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    weatherService = TestBed.inject(WeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct value in search input', () => {
    const searchInput = fixture.nativeElement.querySelector('input')
    searchInput.value = 'Kosice'

    searchInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    expect(searchInput.value).toEqual('Kosice')
  });

  it('should make API call when city name is entered', fakeAsync(() => {
    const searchInput = fixture.nativeElement.querySelector('input').value

    // const city = 'Kosice';
    const mockData: WeatherInterface = {
      coord: {
        lon: 21.3333,
        lat: 48.6667
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04d"
        }
      ],
      base: "stations",
      main: {
        temp: 26.43,
        feels_like: 26.43,
        temp_min: 25.27,
        temp_max: 26.75,
        pressure: 1007,
        humidity: 65
      },
      visibility: 10000,
      wind: {
        speed: 2.06,
        deg: 260
      },
      clouds: {
        all: 75
      },
      dt: 1691076601,
      sys: {
        type: 2,
        id: 2084845,
        country: "SK",
        sunrise: 1691032236,
        sunset: 1691086265
      },
      timezone: 7200,
      id: 865084,
      name: "Kosice",
      cod: 200
    } as WeatherInterface;

    // Call the service method that makes an HTTP request
    weatherService.weatherDataApiCall(searchInput.value, true).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&APPID=9ac6df1b2ee3bacfab0e9a002499c5d4&units=metric`);

    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    tick();
  }));

  afterEach(() => {
    // Verify that there are no pending requests
    httpMock.verify();
  });


});
