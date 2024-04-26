import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { TrakingEnvioConductorComponent } from './traking-envio-conductor/traking-envio-conductor.component';
import { HttpClientModule } from '@angular/common/http';
import { OperacionServiceService } from 'src/services/operacion-service.service';

@NgModule({
  imports: [
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule,  
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,MapComponent,TrakingEnvioConductorComponent],
  providers:[OperacionServiceService, HttpClientModule]
})
export class HomePageModule {}
