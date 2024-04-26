import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideContrasenaPageRoutingModule } from './olvide-contrasena-routing.module';

import { OlvideContrasenaPage } from './olvide-contrasena.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentesModule,
    OlvideContrasenaPageRoutingModule
  ],
  declarations: [OlvideContrasenaPage]
})
export class OlvideContrasenaPageModule {}
