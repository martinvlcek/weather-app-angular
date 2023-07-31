import {Injectable} from '@angular/core';
import {WeatherInterface} from "./weather";
import {BehaviorSubject, catchError, from, mergeMap, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HandleErrorService} from "./handle-error.service";
import {addValueToLocaleStorage, removeValueFromLocaleStorage} from "./helpers";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  readonly apiKey: string = "9ac6df1b2ee3bacfab0e9a002499c5d4"

  readonly apiUrl: string = `https://api.openweathermap.org/data/2.5/weather
    ?q=%LOCATION%
    &APPID=${this.apiKey}
    &units=metric`

  readonly apiUrl2: string = `https://api.openweathermap.org/data/2.5/forecast
    ?q=%LOCATION%
    &APPID=${this.apiKey}
    &units=metric
    &cnt=15`

  readonly apiUrl3: string = `https://api.openweathermap.org/data/2.5/weather
    ?id=%ID%
    &APPID=${this.apiKey}
    &units=metric`

  readonly apiUrl4: string = `https://api.openweathermap.org/data/2.5/forecast
    ?id=%ID%
    &APPID=${this.apiKey}
    &units=metric
    &cnt=15`

  private selectedWeatherDataSubject: BehaviorSubject<WeatherInterface | null> = new BehaviorSubject<WeatherInterface | null>(null)
  private selectedWeather$: Observable<WeatherInterface | null> = this.selectedWeatherDataSubject.asObservable()

  private storedWeatherDataSubject: BehaviorSubject<WeatherInterface[]> = new BehaviorSubject<WeatherInterface[]>([])
  public storedWeatherData$: Observable<WeatherInterface[]> = this.storedWeatherDataSubject.asObservable()

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  fetchWeatherData(location: string): Observable<WeatherInterface | null> {
    if (location.trim()) {
      return this.weatherDataApiCall(location).pipe(
        tap((response: any) => {
          this.selectedWeatherDataSubject.next(response)
        }),
        catchError(this.handleErrorService.handleError('fetch data', location, null))
      )
    } else {
      this.selectedWeatherDataSubject.next(null)
      return of(null)
    }
  }

  fetchWeatherDataById(id: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(this.apiUrl3
      .replace('%ID%', id)
      .replaceAll(/\s/g, "")
    )
  }

  fetchStoredWeatherData(): Observable<any> {
    if (localStorage.getItem("weather")) {
      this.storedWeatherDataSubject.next([]);

      return from(this.getStoredWeatherDataKeys()).pipe(
        mergeMap((location: string) => this.weatherDataApiCall(location)),
        tap((data: WeatherInterface) => {
          const currentData: WeatherInterface[] = this.storedWeatherDataSubject.getValue();
          const newData: WeatherInterface[] = [...currentData, data];
          this.storedWeatherDataSubject.next(newData);
        }),
        catchError(this.handleErrorService.handleError("fetch local storage data", []))
      )
    } else {
      return of([])
    }
  }

  fetchFiveDaysWeatherData(location: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(this.apiUrl2
      .replace('%LOCATION%', location)
      .replaceAll(/\s/g, ""))
  }

  fetchFiveDaysWeatherDataById(id: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(this.apiUrl4
      .replace('%ID%', id)
      .replaceAll(/\s/g, ""))
  }

  weatherDataApiCall(location: string): Observable<WeatherInterface> {
    return this.http.get<WeatherInterface>(this.apiUrl
      .replaceAll(/\s/g, "")
      .replace("%LOCATION%", location)
    )
  }

  addToFavorites(weather: WeatherInterface): void {
    const currentData: WeatherInterface[] = this.storedWeatherDataSubject.getValue()
    const duplicate: boolean = !!currentData.find((w: WeatherInterface): boolean => w.id === weather.id)

    if (!duplicate) {
      addValueToLocaleStorage(weather)

      const newData: WeatherInterface[] = [...currentData, weather]
      this.storedWeatherDataSubject.next(newData)
    }
  }

  removeFromFavorites(weather: WeatherInterface): void {
    const currentData: WeatherInterface[] = this.storedWeatherDataSubject.getValue()
    const newData: WeatherInterface[] = currentData.filter((w: WeatherInterface): boolean => w.id !== weather.id) || []

    removeValueFromLocaleStorage(newData)
    this.storedWeatherDataSubject.next(newData)
  }

  getStoredWeatherDataKeys(): string[] {
    return localStorage.getItem("weather")!.split(";")
  }

  getWeatherData(): Observable<WeatherInterface | null> {
    return this.selectedWeather$
  }

  getStoredWeatherData(): Observable<WeatherInterface[]> {
    return this.storedWeatherData$;
  }
}
