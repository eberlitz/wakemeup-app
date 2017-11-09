import { GeofenceServiceProvider } from './../../providers/geofence-service/geofence-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import * as Leaflet from "leaflet";

@IonicPage()
@Component({
  selector: 'page-geofence-details',
  templateUrl: 'geofence-details.html',
})
export class GeofenceDetailsPage {
  geofence: any;
  private _radius: number;
  private _latLng: any;
  private notificationText: string;
  private circle: any;
  private marker: any;
  private map: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geofenceService: GeofenceServiceProvider,
    private menu: MenuController
  ) {
    this.geofence = navParams.get("geofence");
    this.notificationText = this.geofence.notification.text;
    this._radius = this.geofence.radius;
    this._latLng = Leaflet.latLng(this.geofence.latitude, this.geofence.longitude);
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    this._radius = value;
    this.circle.setRadius(value);
  }

  set latLng(value) {
    this._latLng = value;
    this.circle.setLatLng(value);
    this.marker.setLatLng(value);
  }

  get latLng() {
    return this._latLng;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeofenceDetailsPage');
    this.menu.enable(false);
    // workaround map is not correctly displayed
    // maybe this should be done in some other event
    setTimeout(this.loadMap.bind(this), 100);
  }

  loadMap() {
    this.map = Leaflet
      .map("map")
      .setView(this.latLng, 13)
      .on("click", this.onMapClicked.bind(this))

    Leaflet.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = Leaflet
      .marker(this.latLng, { draggable: true })
      .on("dragend", this.onMarkerPositionChanged.bind(this))
      .addTo(this.map);

    this.circle = Leaflet.circle(this.latLng, this.radius).addTo(this.map);
  }
  onMapClicked(e) {
    this.latLng = e.latlng;
  }

  onMarkerPositionChanged(e) {
    const latlng = e.target.getLatLng();

    this.latLng = latlng;
  }

  saveChanges() {
    const geofence = this.geofence;

    geofence.notification.text = this.notificationText;
    geofence.radius = this.radius;
    geofence.latitude = this.latLng.lat;
    geofence.longitude = this.latLng.lng;
    geofence.transitionType = 1; // On Enter

    this.geofenceService.addOrUpdate(geofence).then(() => {
      this.navCtrl.pop();
    });
  }
}
