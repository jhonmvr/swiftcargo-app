import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoVerificacionPageRoutingModule } from './codigo-verificacion-routing.module';

import { CodigoVerificacionPage } from './codigo-verificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CodigoVerificacionPageRoutingModule
  ],
  declarations: [CodigoVerificacionPage],
  exports: [CodigoVerificacionPage]
})
export class CodigoVerificacionPageModule {}
