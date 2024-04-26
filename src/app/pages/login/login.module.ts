import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from 'src/services/authentication.service';
import { PushNotificacionService } from 'src/services/push.notificacion.service';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    ComponentesModule
  ],
  declarations: [LoginPage],providers:[HttpClientModule,AuthenticationService,PushNotificacionService ]

})
export class LoginPageModule {}
