import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, throwError, timer } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Country } from '../model/country';

@Injectable()
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  private currentConditions: {country: Country, zip: string, conditions: any}[] = [];
  private currentConditionsSubscriptions: {zipcode: string, country: Country, subscription: Subscription}[] = [];
  private locationAdded = new Subject<boolean>();
  public readonly locationAdded$ = this.locationAdded.asObservable();

  constructor(private http: HttpClient) { }

  addCurrentConditions(zipcode: string, country: Country, updateButton = false): void {
    this.endExistingConditionsSubscription(zipcode, country);
    this.subscribeToAndUpdateCurrentConditions(zipcode, country, updateButton);
  }

  subscribeToAndUpdateCurrentConditions(zipcode: string, country: Country, updateButton = false) {
    this.currentConditionsSubscriptions.push(
      {
        zipcode,
        country,
        subscription:
          timer(0, 30000)
            .pipe(
              switchMap(() =>
                this.http.get(`${WeatherService.URL}/weather?zip=${zipcode},${country.code}&units=imperial&APPID=${WeatherService.APPID}`)
              ),
              catchError((e: HttpErrorResponse) => {
                this.locationAdded.next(false);
                return throwError(e);
              })
            )
            .subscribe(data => {
              if (updateButton) {
                this.locationAdded.next(true);
              }
              const currentConditions = this.currentConditions.find(cc => cc.zip === zipcode && cc.country.code === country.code);
              if (!currentConditions)
                this.currentConditions.push({ zip: zipcode, country: country, conditions: data })
            })
      });
  }

  endExistingConditionsSubscription(zipcode: string, country: Country) {
    const index = this.currentConditionsSubscriptions.findIndex(s => s.zipcode === zipcode && s.country.code === country.code);
    if (index >= 0) {
      this.currentConditionsSubscriptions[index].subscription.unsubscribe();
      this.currentConditionsSubscriptions.splice(index, 1);
    }
  }

  removeCurrentConditions(zipcode: string, country: Country) {
    for (let i in this.currentConditions){
      if (this.currentConditions[i].zip === zipcode && this.currentConditions[i].country.code === country.code)
        this.currentConditions.splice(+i, 1);
    }
    this.endExistingConditionsSubscription(zipcode, country);
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  getForecast(zipcode: string, countryCode: string): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(`${WeatherService.URL}/forecast/daily?zip=${zipcode},${countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);

  }

  getWeatherIcon(id){
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }

}
