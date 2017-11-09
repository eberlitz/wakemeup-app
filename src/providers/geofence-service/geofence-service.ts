import { Geofence } from '@ionic-native/geofence';
// import { Geofence } from '@ionic-native/geofence';
import { Injectable } from '@angular/core';


import { generateUUID } from '../../utils/uuid';

@Injectable()
export class GeofenceServiceProvider {
  private geofences = [];
  constructor(private geofence: Geofence) {
    console.log('Hello GeofenceServiceProvider Provider');
  }

  findAll() {
    return Promise.resolve(this.geofences);
    // return window.geofence.getWatched()
    // .then((geofencesJson) => {
    //   const geofences = JSON.parse(geofencesJson);

    //   this.geofences = geofences;
    //   return geofences;
    // });
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

  removeAll() {
    return this.geofence.removeAll().then(() => {
      this.geofences.length = 0;
    });
  }

  remove(geofence) {
    return this.geofence.remove(geofence.id).then(() => {
      this.geofences.splice(this.geofences.indexOf(geofence), 1);
    });
  }

  create(attributes: any): any {
    const defaultGeofence = {
      id: generateUUID(),
      latitude: 50,
      longitude: 50,
      radius: 1000,
      transitionType: 3,
      notification: {
        id: this.getNextNotificationId(),
        title: "Ionic geofence example",
        text: "",
        icon: "res://ic_menu_mylocation",
        openAppOnClick: true,
      },
    };

    return Object.assign(defaultGeofence, attributes);
  }

  addOrUpdate(geofence: any): any {
    return this.geofence.addOrUpdate(geofence)
      .then(() => this.findById(geofence.id))
      .then((found) => {
        if (!found) {
          this.geofences.push(geofence);
        } else {
          const index = this.geofences.indexOf(found);

          this.geofences[index] = geofence;
        }
      });
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
