import { Component } from '@angular/core';

/**
 * Generated class for the GeofenceListItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'geofence-list-item',
  templateUrl: 'geofence-list-item.html'
})
export class GeofenceListItemComponent {

  text: string;

  constructor() {
    console.log('Hello GeofenceListItemComponent Component');
    this.text = 'Hello World';
  }

}
