import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';

import { CodigoVerificacionPage } from './codigo-verificacion.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoVerificacionPage,
    data: { moduleName: [] },
    canLoad: [AuthGuard],
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoVerificacionPageRoutingModule {}
