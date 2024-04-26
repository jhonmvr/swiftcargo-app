import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { DetalleEnvioComponent } from './detalle-envio/detalle-envio.component';
import { TrakingEnvioConductorComponent } from './traking-envio-conductor/traking-envio-conductor.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'tracking-envios',
    loadChildren: () => import('./tracking-envios/tracking-envios.module').then( m => m.TrackingEnviosPageModule)
  },
  {
    path: 'detalle',
    component: DetalleEnvioComponent,
  },
  {
    path: 'conductor-envios',
    component: TrakingEnvioConductorComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
