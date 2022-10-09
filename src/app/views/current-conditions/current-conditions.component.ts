import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { Observable, of, pipe, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Conditions } from '../../models/conditions';
import { Country } from '../../models/country';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnDestroy {

  private subscription = new Subscription();

  locations: {zip: string, country: Country, observable: Observable<any>}[] = [];

  constructor(public weatherService: WeatherService,
              public locationService: LocationService) {
    this.subscribeToWeather();
  }

  subscribeToWeather() {
    this.subscription.add(this.weatherService.getCurrentConditions()
      .subscribe((conditions: Conditions[]) => {
        this.locations.splice(0, this.locations.length);
        conditions.forEach(condition => {
          this.locations.push({
            zip: condition.zip,
            country: condition.country,
            observable: this.weatherService.loadCurrentConditions(condition.zip, condition.country)
          })
        })
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeLocation($event: any) {
    this.locationService.removeLocation($event.zip, $event.country)
  }
}
