import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoaderInterceptor } from 'src/services/loader.interceptor';
import { ComponentesModule } from './componentes/componentes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ComponentesModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AuthenticationService,HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },ComponentesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
