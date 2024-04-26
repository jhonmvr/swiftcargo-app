import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { timer } from 'rxjs';
import { OperacionServiceService } from '../../../../services/operacion-service.service';
import { Position, Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-traking-envio-conductor',
  templateUrl: './traking-envio-conductor.component.html',
  styleUrls: ['./traking-envio-conductor.component.scss'],
})
export class TrakingEnvioConductorComponent implements OnInit {
  pos!: any;

  TIME_INTERVAL = 30000;

  constructor(private operacionServiceService: OperacionServiceService) { }

  ngOnInit() {
    Preferences.get({ key: "reUser" }).then(p => {
      this.operacionServiceService.buscarEnvioByConductor(p?.value).subscribe((p: any) => {
        console.log("asdasd", p)
        this.pos = p;
        timer(0, this.TIME_INTERVAL).subscribe(async p => {
          
          await Geolocation.getCurrentPosition().then(async position => {
            this.pos.lat = position.coords.latitude
            this.pos.lng = position.coords.longitude
          });
          this.operacionServiceService.actualizarUbicacionVehiculo(this.pos).subscribe(async (p: any) => {
            console.log("p>>>>>>>>>>", p)
            this.pos = p;
          });
        })
      });
    });

   

  }


}
