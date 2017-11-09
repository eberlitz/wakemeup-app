import { GeofenceServiceProvider } from './../../providers/geofence-service/geofence-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Geofence } from "@ionic-native/geofence";
import { Geolocation } from '@ionic-native/geolocation';
import { GeofenceDetailsPage } from '../geofence-details/geofence-details';

@IonicPage()
@Component({
  selector: 'page-geofence-list',
  templateUrl: 'geofence-list.html',
})
export class GeofenceListPage {

  isLoading: boolean = false;
  geofences = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geofenceService: GeofenceServiceProvider,
    private geolocation: Geolocation
  ) {
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad GeofenceListPage');
    try {
      this.isLoading = true;
      this.geofences = await this.geofenceService.findAll();
    } finally {
      this.isLoading = false;
    }
  }

  create() {
    this.geolocation.getCurrentPosition({ timeout: 5e3 }).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      const geofence = this.geofenceService.create({
        longitude: resp.coords.longitude,
        latitude: resp.coords.latitude,
      });

      this.transitionToDetailsPage(geofence);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private transitionToDetailsPage(geofence: any): any {
    this.navCtrl.push(GeofenceDetailsPage, {
      geofence
    })
  }

}
