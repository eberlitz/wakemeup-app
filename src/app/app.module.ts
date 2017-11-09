import { Geofence } from '@ionic-native/geofence';
import { Geolocation } from '@ionic-native/geolocation';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import * as Leaflet from "leaflet";

import { GeofenceDetailsPage } from "../pages/geofence-details/geofence-details";
import { GeofenceListItemComponent } from "../components/geofence-list-item/geofence-list-item";
import { GeofenceListPage } from "../pages/geofence-list/geofence-list";
import { GeofenceServiceProvider } from '../providers/geofence-service/geofence-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    GeofenceDetailsPage,
    GeofenceListPage,
    GeofenceListItemComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GeofenceDetailsPage,
    GeofenceListPage,
    GeofenceListItemComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation,
    Geofence,
    GeofenceServiceProvider
  ]
})
export class AppModule { }
