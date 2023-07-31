import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor() { }

  public handleError<T>(operation = '', location: string | string[], result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)

      alert(location + " " + error.statusText)

      return of(result as T)
    }
  }
}
