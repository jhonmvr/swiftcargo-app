import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { HeaderRosaditoComponent } from './header-rosadito/header-rosadito.component';
import { HeaderGrisComponent } from './header-gris/header-gris.component';
import { HeaderRosaComponent } from './header-rosa/header-rosa.component';
import { FranjaRosadaComponent } from './franja-rosada/franja-rosada.component';
import { FranjaRenovacionComponent } from './franja-renovacion/franja-renovacion.component';
import { ListaMenuComponent } from './lista-menu/lista-menu.component';




@NgModule({
  declarations: [ MenuComponent, HeaderRosaditoComponent, HeaderGrisComponent,
     HeaderRosaComponent, FranjaRosadaComponent,  FranjaRenovacionComponent, ListaMenuComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

  ],
  exports: [ MenuComponent, HeaderRosaditoComponent,  HeaderGrisComponent, HeaderRosaComponent,
    FranjaRosadaComponent,  FranjaRenovacionComponent, ListaMenuComponent]
})
export class ComponentesModule { }
