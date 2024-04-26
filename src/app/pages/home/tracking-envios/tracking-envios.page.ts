import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';
import { OperacionServiceService } from 'src/services/operacion-service.service';

@Component({
  selector: 'app-tracking-envios',
  templateUrl: './tracking-envios.page.html',
  styleUrls: ['./tracking-envios.page.scss'],
})
export class TrackingEnviosPage implements OnInit {
  isSubmitted = false;
  openModal = false;
  shipment!:any;

  lista!:any;
  constructor(private operacionServiceService: OperacionServiceService,private modalController:ModalController,
		private router: Router,) { }

  ngOnInit() {
    Preferences.get({ key: "reUser" }).then(p=>{
      this.operacionServiceService.buscarEnviosPorUsuario(p?.value).subscribe((p:any)=>{
      console.log("asdasd",p)
        this.lista = p;
      })
    })
    
  }

  async verDetalle(envio:any){
    this.openModal = false;
    await this.modalController.dismiss();
    this.router.navigate(['/home',envio]);

  }

  openLocationModal(item:any) {
    this.shipment = item;
    this.openModal = true;
  }
}
