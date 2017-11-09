import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeofenceListPage } from './geofence-list';

@NgModule({
  declarations: [
    GeofenceListPage,
  ],
  imports: [
    IonicPageModule.forChild(GeofenceListPage),
  ],
})
export class GeofenceListPageModule {}
