import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountrySelectorService {
  private country = new Subject<Country>();
  public readonly country$ = this.country.asObservable();

  setCountry(country: Country) {
    this.country.next(country);
  }
}
