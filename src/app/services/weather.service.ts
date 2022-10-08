import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Country } from '../models/country';
import { polling } from '../decorators/polling.decorator';
import { Conditions } from '../models/conditions';

@Injectable()
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions = new BehaviorSubject<Conditions[]>([]);
  private locationAdded = new Subject<boolean>();
  public readonly locationAdded$ = this.locationAdded.asObservable();

  constructor(private http: HttpClient) { }

  addCurrentConditions(zip: string, country: Country) {
    const currentConditions = this.currentConditions.value;
    const condition = currentConditions.find(c => c.zip === zip && c.country.code === country.code);
    if (!condition) {
      currentConditions.push({zip, country, conditions: undefined});
      this.currentConditions.next(currentConditions);
      this.locationAdded.next(true);
    }
    this.locationAdded.next(false);
  }

  @polling()
  loadCurrentConditions(zip: string, country: Country) {
    return this.http.get(`${WeatherService.URL}/weather?zip=${zip},${country.code}&units=imperial&APPID=${WeatherService.APPID}`)
      .pipe(
        tap((data) => {
          const currentConditions = this.currentConditions.value;
          const condition = currentConditions.find(c => c.zip === zip && c.country === country);
          condition.conditions = data;
        })
      )
  }

  removeCurrentConditions(zipcode: string, country: Country) {
    const currentConditions = this.currentConditions.value;
    const index = currentConditions.findIndex(c => c.zip === zipcode && c.country === country);
    currentConditions.splice(index, 1);
    this.currentConditions.next(currentConditions);
  }

  getCurrentConditions(): Observable<Conditions[]> {
    return this.currentConditions.asObservable();
  }

  getForecast(zipcode: string, countryCode: string): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

}
