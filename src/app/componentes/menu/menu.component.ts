import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuType: string = 'overlay';
  nombre: any;
  notificacion:boolean= false;
  constructor(private menu: MenuController, private navCtrl :NavController,private storage: StorageService ) { }
  cliente: string ='Cristian'
  ngOnInit() {
    this.getNombre();
  
  }

  cambiarNotificacion(){
    this.storage.nuevaNotificacion.next(false);
    console.log("cambiar notificacion");
    this.verNotificaciones();
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  openEnd() {
    this.menu.open('end');
  }
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  getNombre(){
    this.storage.get('nombre').then( p=> {
      this.nombre = p
    });
    
  }
  logout() {
    this.navCtrl.navigateRoot('/login', {animated: true});
  }
  verNotificaciones(){
    this.navCtrl.navigateRoot('/renovacion/notificaciones', {animated: true});
  }

  cambiarContrasena(){
    this.navCtrl.navigateRoot('/cambiar-contrasena', {animated: true});
  }




}
