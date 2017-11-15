import { GeofenceServiceProvider } from './../../providers/geofence-service/geofence-service';
import { Geofence } from '@ionic-native/geofence';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'geofence-list-item',
  templateUrl: 'geofence-list-item.html'
})
export class GeofenceListItemComponent {

  @Input() geofence;
  @Output() onItemTapped: EventEmitter<any> = new EventEmitter();

  constructor(private geofenceService: GeofenceServiceProvider) {
  }

  get header() {
    return this.geofence.notification.text;
  }

  get details() {
    return `When ${this.transitionTypeText} within ${this.geofence.radius}m`;
  }

  get transitionTypeText() {
    switch (this.geofence.transitionType) {
      case 1: return "entering region";
      case 2: return "exiting region";
      case 3: return "entering or exiting region";
    }
  }

  itemTapped() {
    this.onItemTapped.emit(null);
  }

  remove() {
    this.geofenceService.remove(this.geofence);
  }
}
