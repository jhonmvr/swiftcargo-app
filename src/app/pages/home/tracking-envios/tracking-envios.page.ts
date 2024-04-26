import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { OperacionServiceService } from 'src/services/operacion-service.service';

@Component({
  selector: 'app-tracking-envios',
  templateUrl: './tracking-envios.page.html',
  styleUrls: ['./tracking-envios.page.scss'],
})
export class TrackingEnviosPage implements OnInit {

  lista!:any;
  constructor(private operacionServiceService: OperacionServiceService,
		private router: Router,) { }

  ngOnInit() {
    Preferences.get({ key: "reUser" }).then(p=>{
      this.operacionServiceService.buscarEnviosPorUsuario(p?.value).subscribe((p:any)=>{
      console.log("asdasd",p)
        this.lista = p;
      })
    })
    
  }

  verDetalle(envio:any){
    //this.router.navigateByUrl('/home', { replaceUrl: true });
    this.router.navigate(['/home',envio]);

  }
}
