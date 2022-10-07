import { Component, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { pipe, Subscription, timer } from 'rxjs';
import { LocationService } from '../../location.service';
import { delay, tap } from 'rxjs/operators';
import { ZipCodeService } from '../../services/zip-code.service';
import { CountrySelectorService } from '../../services/country-selector.service';
import { Country } from '../../model/country';

@Component({
  selector: 'app-state-button',
  templateUrl: './state-button.component.html',
  styleUrls: ['./state-button.component.scss'],
})
export class StateButtonComponent implements OnDestroy {

  @ViewChild('save')
  initialTemplate: TemplateRef<any>;
  @ViewChild('saving')
  savingTemplate: TemplateRef<any>;
  @ViewChild('saved')
  savedTemplate: TemplateRef<any>;

  currentTemplate: TemplateRef<any>;

  private zipcode: string = '';
  private country: Country;
  private subscription = new Subscription();

  constructor(private service: LocationService,
              private countrySelector: CountrySelectorService,
              private weatherService: WeatherService,
              private zipcodeService: ZipCodeService) {
    this.subscribeToZipcode();
    this.subscribeToCountry();
    this.subscribeToAddedLocation();
  }

  addLocation() {
    this.currentTemplate = this.savingTemplate;
    this.service.addLocation(this.zipcode, this.country)
  }

  subscribeToCountry() {
    this.subscription.add(
      this.countrySelector.country$
        .subscribe((country) => this.country = country)
    );
  }

  subscribeToZipcode() {
    this.subscription.add(
      this.zipcodeService.zipcode$
        .subscribe((zipcode) => this.zipcode = zipcode)
    );
  }

  subscribeToAddedLocation() {
    this.subscription.add(
      this.weatherService.locationAdded$
        .pipe(
          tap((added: boolean) => {
            if (added) {
              this.currentTemplate = this.savedTemplate;
            } else {
              this.currentTemplate = this.initialTemplate;
            }
          }),
          delay(500)
        )
        .subscribe(() => {
          this.currentTemplate = this.initialTemplate;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
