import { Component, OnDestroy } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { LocationService } from '../../services/location.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnDestroy {

  private subscription = new Subscription();

  constructor(public weatherService: WeatherService,
              public locationService: LocationService,
              private router : Router) {
    this.subscribeToWeather();
  }

  subscribeToWeather() {
    this.getCurrentConditions()
      .subscribe((conditions) => conditions.forEach(condition => {
        this.subscription.add(
          this.weatherService.loadCurrentConditions(condition.zip, condition.country).subscribe()
        );
    }));
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(zipcode : string, countryCode: string){
    this.router.navigate(['/forecast', zipcode, countryCode])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
