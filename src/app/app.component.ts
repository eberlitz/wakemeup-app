import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as Leaflet from "leaflet";

import { GeofenceListPage } from "../pages/geofence-list/geofence-list";
import { Geofence } from '@ionic-native/geofence';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = GeofenceListPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    geofence: Geofence) {
    platform.ready().then(() => {
      Leaflet.Icon.Default.imagePath = "assets/leaflet/images/";
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      geofence.initialize().then((initStatus) => {
        console.log("Geofence Plugin has been initialized", initStatus);
        geofence.onTransitionReceived().subscribe((geo) => {
          console.log("Geofence transition detected", geo);
        });
        geofence.onNotificationClicked().subscribe((notificationData) => {
          console.log("App opened from Geo Notification!", notificationData);
        });
      }).catch((error) => {
        console.error(error);
      })
    });
  }
}
