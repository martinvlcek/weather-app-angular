import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { WeatherMainComponent } from './weather-main/weather-main.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherFavoriteComponent } from './weather-favorite/weather-favorite.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherHomeComponent } from "./views/weather-home/weather-home.component";
import { WeatherDetailComponent } from "./views/weather-detail/weather-detail.component";
import { WeatherFavoriteItemComponent } from './weather-favorite/weather-favorite-item/weather-favorite-item.component';
import { WeatherExtendedComponent } from './weather-extended/weather-extended.component';
import { WeatherExtendedItemComponent } from './weather-extended/weather-extended-item/weather-extended-item.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherMainComponent,
    WeatherSearchComponent,
    WeatherFavoriteComponent,
    WeatherHomeComponent,
    WeatherDetailComponent,
    WeatherFavoriteItemComponent,
    WeatherExtendedComponent,
    WeatherExtendedItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
