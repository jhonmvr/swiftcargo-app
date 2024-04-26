import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingEnviosPage } from './tracking-envios.page';
import { OperacionServiceService } from 'src/services/operacion-service.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: TrackingEnviosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
  providers:[OperacionServiceService, HttpClientModule]
})
export class TrackingEnviosPageRoutingModule {}
