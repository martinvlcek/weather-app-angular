import {Injectable} from '@angular/core';
import {WeatherInterface} from "./weather";
import {BehaviorSubject, catchError, from, mergeMap, Observable, of, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {HandleErrorService} from "./handle-error.service";
import {addValueToLocaleStorage, removeValueFromLocaleStorage} from "./helpers";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey: string = environment.apiKey
  private readonly apiUrl1: string = environment.apiUrl1
  private readonly apiUrl2: string = environment.apiUrl2

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
      return this.weatherDataApiCall(location, true).pipe(
        tap((response: any) => {
          this.selectedWeatherDataSubject.next(response)
        }),
        catchError(this.handleErrorService.handleError('fetchWeatherData', location, null))
      )
    } else {
      this.selectedWeatherDataSubject.next(null)
      return of(null)
    }
  }

  fetchStoredWeatherData(): Observable<any> {
    if (localStorage.getItem("weather")) {
      this.storedWeatherDataSubject.next([]);

      return from(this.getStoredWeatherDataKeys()).pipe(
        mergeMap((location: string) => this.weatherDataApiCall(location, false)),
        tap((data: WeatherInterface) => {
          const currentData: WeatherInterface[] = this.storedWeatherDataSubject.getValue();
          const newData: WeatherInterface[] = [...currentData, data];
          this.storedWeatherDataSubject.next(newData);
        }),
        catchError(this.handleErrorService.handleError("fetchStoredWeatherData", []))
      )
    } else {
      return of([])
    }
  }

  weatherDataApiCall(value: string | number, byName: boolean, singleCall: boolean = true): Observable<WeatherInterface> {
    let params: HttpParams = new HttpParams()
      .set(byName ? "q" : "id", value)
      .set("APPID", this.apiKey)
      .set("units", "metric")

    if (!singleCall) params = params.set("cnt", 15)

    return this.http.get<WeatherInterface>(!singleCall ?  this.apiUrl2 : this.apiUrl1, { params })
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
