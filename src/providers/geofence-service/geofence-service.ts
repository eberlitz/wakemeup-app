import { Platform } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { Injectable } from '@angular/core';
import { generateUUID } from '../../utils/uuid';

@Injectable()
export class GeofenceServiceProvider {
  private geofences = [];
  constructor(
    private geofence: Geofence,
    public plt: Platform
  ) {
    console.log('Hello GeofenceServiceProvider Provider');
  }

  async findAll() {
    if (this.usePlugin()) {
      const geofencesJson = await this.geofence.getWatched();
      this.geofences = JSON.parse(geofencesJson);
    }
    return this.geofences;
  }

  private usePlugin() {
    return this.plt.is('cordova');
  }

  clone(geofence: Geofence) {
    return JSON.parse(JSON.stringify(geofence));
  }

  findById(id) {
    const found = this.geofences.filter(g => g.id === id);

    if (found.length > 0) {
      return found[0];
    }

    return undefined;
  }

  async removeAll() {
    if (this.usePlugin()) {
      await this.geofence.removeAll();
    }
    this.geofences.length = 0;
  }

  async remove(geofence) {
    if (this.usePlugin()) {
      await this.geofence.remove(geofence.id);
    }
    this.geofences.splice(this.geofences.indexOf(geofence), 1);
  }

  create(attributes: any): any {
    var sound = this.plt.is('android') ? 'file://assets/sound.mp3' : 'file://assets/beep.caf';
    const defaultGeofence = {
      id: generateUUID(),
      latitude: 50,
      longitude: 50,
      radius: 1000,
      transitionType: 3,
      notification: {
        id: this.getNextNotificationId(),
        title: "Geoalarm",
        text: "",
        icon: "res://ic_menu_mylocation",
        openAppOnClick: true,
        vibration: [1000, 500, 1000],
        sound
      },
    };

    return Object.assign(defaultGeofence, attributes);
  }

  async addOrUpdate(geofence: any) {
    if (this.usePlugin()) {
      await this.geofence.addOrUpdate(geofence);
    }
    const found = this.findById(geofence.id);
    if (!found) {
      this.geofences.push(geofence);
    } else {
      const index = this.geofences.indexOf(found);
      this.geofences[index] = geofence;
    }
  }

  private getNextNotificationId() {
    var max = 0;

    this.geofences.forEach(function (gf) {
      if (gf.notification && gf.notification.id) {
        if (gf.notification.id > max) {
          max = gf.notification.id;
        }
      }
    });

    return max + 1;
  }
}
