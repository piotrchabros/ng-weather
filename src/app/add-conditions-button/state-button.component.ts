import { Component, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { pipe, Subscription, timer } from 'rxjs';
import { LocationService } from '../location.service';
import { delay, tap } from 'rxjs/operators';

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

  @Input()
  zipcode: string;

  currentTemplate: TemplateRef<any>;

  private subscription = new Subscription();

  constructor(private service: LocationService, private weatherService: WeatherService) {
    this.subscribeToAddedLocation();
  }

  addLocation() {
    this.currentTemplate = this.savingTemplate;
    this.service.addLocation(this.zipcode)
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
