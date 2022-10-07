import { Injectable } from '@angular/core';
import {WeatherService} from "./services/weather.service";
import { Country } from './models/country';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : {country: Country, zipcode: string}[] = [];

  constructor(private weatherService : WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc.zipcode, loc.country);
  }

  addLocation(zipcode : string, country: Country){
    this.locations.push({zipcode, country});
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(zipcode, country);
  }

  removeLocation(zipcode : string, country: Country){
    let index = this.locations.findIndex(loc => loc.zipcode === zipcode && loc.country.code === country.code)
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode, country);
    }
  }
}
