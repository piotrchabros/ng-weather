import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ZipcodeEntryComponent } from './views/zipcode-entry/zipcode-entry.component';
import { LocationService } from './services/location.service';
import { ForecastsListComponent } from './views/forecasts-list/forecasts-list.component';
import { WeatherService } from './services/weather.service';
import { CurrentConditionsComponent } from './views/current-conditions/current-conditions.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StateButtonComponent } from './views/state-button/state-button.component';
import { CountryEntryComponent } from './views/country-entry/country-entry.component';
import { CountryItemComponent } from './views/country-entry/country-item/country-item.component';
import { HighlighterPipe } from './pipes/highlighter.pipe';
import { StateButtonControllerComponent } from './views/state-button-controller/state-button-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    StateButtonComponent,
    CountryEntryComponent,
    CountryItemComponent,
    HighlighterPipe,
    StateButtonControllerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [HighlighterPipe, LocationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
