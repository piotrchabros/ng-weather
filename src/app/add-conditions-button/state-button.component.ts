import { Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.service';

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
        .subscribe((added: boolean) => {
          if (added) {
            this.currentTemplate = this.savedTemplate;
          } else {
            this.currentTemplate = this.initialTemplate;
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
