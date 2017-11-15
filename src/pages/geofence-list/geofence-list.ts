import { GeofenceServiceProvider } from './../../providers/geofence-service/geofence-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController
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

  async create() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      dismissOnPageChange: true
    });
    loader.present();
    let [latitude, longitude] = [50, 50];
    try {
      const resp = await this.geolocation.getCurrentPosition({ timeout: 5e3, maximumAge: 1000 * 60 * 10 });
      longitude = resp.coords.longitude;
      latitude = resp.coords.latitude;
    } catch (error) {
      console.log('Error getting location', error);
    }
    const geofence = this.geofenceService.create({
      longitude,
      latitude
    });
    this.showDetails(geofence);
    loader.dismiss();
  }

  private showDetails(geofence: any): any {
    this.navCtrl.push(GeofenceDetailsPage, {
      geofence
    })
  }

}
