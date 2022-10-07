import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Country } from '../../model/country';
import { Subscription } from 'rxjs';
import { LocationService } from '../../location.service';
import { CountrySelectorService } from '../../services/country-selector.service';
import { WeatherService } from '../../services/weather.service';
import { ZipCodeService } from '../../services/zip-code.service';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-state-button-controller',
  templateUrl: './state-button-controller.component.html',
  styleUrls: ['./state-button-controller.component.scss']
})
export class StateButtonControllerComponent {

  @ViewChild('save')
  saveTemplate: TemplateRef<any>;

  @ViewChild('saving')
  savingTemplate: TemplateRef<any>;

  @ViewChild('saved')
  savedTemplate: TemplateRef<any>

  currentTemplate: TemplateRef<any>;

  private zipcode: string = '';
  private country: Country;
  private subscription = new Subscription();

  constructor(private service: LocationService,
              private countrySelector: CountrySelectorService,
              private weatherService: WeatherService,
              private zipcodeService: ZipCodeService) {
    this.currentTemplate = this.saveTemplate;
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
            }
          }),
          delay(500)
        )
        .subscribe(() => {
          this.currentTemplate = this.saveTemplate;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
