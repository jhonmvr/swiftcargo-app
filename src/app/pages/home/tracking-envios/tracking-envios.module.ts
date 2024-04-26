import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingEnviosPageRoutingModule } from './tracking-envios-routing.module';

import { TrackingEnviosPage } from './tracking-envios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingEnviosPageRoutingModule
  ],
  declarations: [TrackingEnviosPage]
})
export class TrackingEnviosPageModule {}
