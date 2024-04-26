import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { OperacionServiceService } from '../../../services/operacion-service.service';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.page.html',
  styleUrls: ['./codigo-verificacion.page.scss'],
})
export class CodigoVerificacionPage implements OnInit {

  
  disableMensajeButton: any;
  disableMensaje = new BehaviorSubject<boolean>(false);
  botonActivado: boolean = true;
  inputCodigo = new FormControl('', [Validators.required ]);
  estadoCodigo='Enviar codigo'
  correo= ''  
  @Output()
  completedVerificacion: EventEmitter<any> = new EventEmitter<any>();
  constructor(private operacionService :OperacionServiceService,private storage: StorageService,private alertController: AlertController) {
    this.disableMensajeButton   = this.disableMensaje.asObservable();
  }

  ngOnInit() {
    
  }



  async enviarCodigo(){
    const id=await this.storage.get("reUser")
    if(id){
      
    }
  }

  async completed() {
  const id = await this.storage.get("reUser");
  if (id && this.inputCodigo.value) {
   
  }
}

}
