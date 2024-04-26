import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarContrasenaPageRoutingModule } from './cambiar-contrasena-routing.module';

import { CambiarContrasenaPage } from './cambiar-contrasena.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarContrasenaPageRoutingModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  declarations: [CambiarContrasenaPage]
})
export class CambiarContrasenaPageModule {}
