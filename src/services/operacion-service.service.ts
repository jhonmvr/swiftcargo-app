import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ActionSheetController, ModalController, PopoverController } from '@ionic/angular';
import { forkJoin, from, map, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionServiceService {
  params: any

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  databamongoDb: string = 'quski-core-documento';
  mongoColeccion: string = 'documento-habilitante';
  mongoColeccionNotificacion: string = 'documento-notificacion';
  constructor(private http: HttpClient, private storage: StorageService, private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,) {
      this.storage.setParameter();
  }



  buscarEnviosPorUsuario(identificacion: any) {
    this.storage.appResourcesUrl = 'http://localhost:8080/api/v1/'
    let serviceUrl = this.storage.appResourcesUrl + "SwiftCargo/listarEnviosPorUsuario" ;
    this.params = new HttpParams();

    this.params = this.params.set('identificacion', identificacion);

    let options = { headers: this.headers, params: this.params };
    return this.http.get(serviceUrl, options).pipe(
      tap( // Log the result or error
        (data: any) => data,
        error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
      )
    );
  }

  buscarEnvioByConductor(identificacion:any){
    this.storage.appResourcesUrl = 'http://localhost:8080/api/v1/'
    let serviceUrl = this.storage.appResourcesUrl + "SwiftCargo/buscarEnvioByConductor" ;
    this.params = new HttpParams();

    this.params = this.params.set('identificacion', identificacion);

    let options = { headers: this.headers, params: this.params };
    return this.http.get(serviceUrl, options).pipe(
      tap( // Log the result or error
        (data: any) => data,
        error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
      )
    );
  }
  actualizarUbicacionVehiculo(vehiculo:any){
    this.storage.appResourcesUrl = 'http://localhost:8080/api/v1/'
    let serviceUrl = this.storage.appResourcesUrl + "SwiftCargo/actualizarUbicacionVehiculo" ;
    this.params = new HttpParams();

    let options = { headers: this.headers, params: this.params };
    return this.http.post(serviceUrl,vehiculo, options).pipe(
      tap( // Log the result or error
        (data: any) => data,
        error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
      )
    );
  }
}
