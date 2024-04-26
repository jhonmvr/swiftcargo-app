import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-lista-menu',
  templateUrl: './lista-menu.component.html',
  styleUrls: ['./lista-menu.component.scss'],
})
export class ListaMenuComponent implements OnInit {

  constructor(private navCtrl :NavController) { }

  ngOnInit() {}


  logout() {
    this.navCtrl.navigateRoot('/login', {animated: true});
  }
  verNotificaciones(){
    // this.navCtrl.navigateRoot('/renovacion/notificaciones', {animated: true});
    this.navCtrl.navigateRoot('/renovacion/fingerprint', {animated: true});
  }

  cambiarContrasena(){
    this.navCtrl.navigateRoot('/cambiar-contrasena', {animated: true});
  }
  goHome(){
    this.navCtrl.navigateRoot('/renovacion/listado-operacion', {animated: true});
  }
}
