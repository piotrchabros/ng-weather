import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from '../../../services/weather.service';
import { Country } from '../../../models/country';

@Component({
  selector: 'app-conditions-card',
  templateUrl: './conditions-card.component.html',
  styleUrls: ['./conditions-card.component.scss']
})
export class ConditionsCardComponent implements OnChanges {

  @Input()
  location: {zip: string, country: Country, observable: Observable<any>};

  @Output()
  closeEvent = new EventEmitter();

  @Input()
  iconSrc: string;

  ngOnChanges(changes: SimpleChanges) {
  }

  constructor(private router: Router) {
  }

  emitCloseEvent() {
    this.closeEvent.emit({zip: this.location.zip, country: this.location.country});
  }

  showForecast(zipcode : string, countryCode: string){
    this.router.navigate(['/forecast', zipcode, countryCode])
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
