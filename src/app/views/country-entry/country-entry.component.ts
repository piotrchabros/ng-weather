import { Component, ElementRef, HostListener } from '@angular/core';
import { CountrySelectorService } from '../../services/country-selector.service';
import { countries } from '../../data/countries';
import { Country } from '../../models/country';

const filterCriteria = <T>(text: string, item: T, prop: string) =>
  item[prop].toLowerCase().includes(text.toLowerCase());

@Component({
  selector: 'app-country-entry',
  templateUrl: './country-entry.component.html',
  styleUrls: ['country-entry.component.scss']
})
export class CountryEntryComponent {
  countries = countries;
  countriesFiltered = [];
  showAutocomplete = false;
  text: string;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showAutocomplete = false;
    }
  }

  constructor(private eRef: ElementRef, private countrySelector: CountrySelectorService) {
  }

  filterCountries() {
    this.countriesFiltered = this.countries
      .filter((country) => filterCriteria<Country>(this.text, country, "name"))
      .slice(0, 5);
  }

  selectCountry(country: Country) {
    this.countrySelector.setCountry(country);
    this.text = country.name;
    this.showAutocomplete = false;
  }
}
