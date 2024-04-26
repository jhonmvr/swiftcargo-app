import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';

import { CambiarContrasenaPage } from './cambiar-contrasena.page';

const routes: Routes = [
  {
    path: '',
    component: CambiarContrasenaPage,
    data: { moduleName: [] },
    canLoad: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiarContrasenaPageRoutingModule {}
