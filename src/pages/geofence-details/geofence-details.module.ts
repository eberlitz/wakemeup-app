import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeofenceDetailsPage } from './geofence-details';

@NgModule({
  declarations: [
    GeofenceDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GeofenceDetailsPage),
  ],
})
export class GeofenceDetailsPageModule {}
