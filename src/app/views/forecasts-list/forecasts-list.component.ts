import { Component } from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {ActivatedRoute} from '@angular/router';
import { Country } from '../../models/country';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  countryCode: string;
  forecast: any;

  constructor(private weatherService: WeatherService, route : ActivatedRoute) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      this.countryCode = params['countryCode'];
      weatherService.getForecast(this.zipcode, this.countryCode)
        .subscribe(data => {
          this.forecast = data
        });
    });
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
