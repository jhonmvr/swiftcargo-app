import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPageRoutingModule } from './registrar-routing.module';

import { RegistrarPage } from './registrar.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [RegistrarPage],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RegistrarPageRoutingModule,
        ReactiveFormsModule,
        ComponentesModule,
        
    ],providers:[AuthenticationService,HttpClientModule]
})
export class RegistrarPageModule {}
