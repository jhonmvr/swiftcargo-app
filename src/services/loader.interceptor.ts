import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { LoaderService } from './loader.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  count = 0;
  tokeType: string | null = null;
  accessToken: string | null = null;
  constructor(private storage: StorageService, private loadingController: LoaderService,private  alertController: AlertController) {
    this.loadToken();


  }
  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async loadToken() {

    this.tokeType = this.storage.tokeType;
    this.accessToken = this.storage.accessToken;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loadToken();
    //console.log(" entra a inspector", this.tokeType);
    //console.log(" entra a inspector", this.accessToken);
    this.storage.setParameter();
    if (JSON.stringify(req).indexOf("/api/") >= 0 || JSON.stringify(req).indexOf("/token") >= 0) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.tokeType} ${this.accessToken}`
        }
      });
    }/*  else if ( JSON.stringify(req).indexOf("/setToken") >= 0) {
      req = req.clone({

      });
    } */ else {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.tokeType} ${this.accessToken}`
        },
        setParams: {
          autorizacion: `${this.tokeType} ${this.accessToken}`
        }
      });
    }

    if (JSON.stringify(req).indexOf("listAlertaDeProcesosAprobado") < 0) {
      setTimeout(() => {
        //this.loaderService.show();
      }, 0);
    }
    this.count++;

    return next.handle(req).pipe(tap(

      event => "",

      error => {
        ////console.log("esto capturo cuando sale error bb========>",error);
        this.HandleError(error);
      }), finalize(() => {

        this.count--;

        if (this.count <= 0) {
          // this.count = 0;
          setTimeout(() => {
            this.loadingController.dismiss();
          }, 0);
        }
      })
    );
  }

  HandleError(error: any) {
    //debugger;
    ////console.log("eror===>>>>",JSON.stringify(error))
    if (JSON.stringify(error).indexOf("codError") > 0) {
      let b = error.error;
      this.presentAlert(b.msgError);
    } else if (error.error instanceof Blob) {
      this.presentAlert("NO SE ENCUENTRA O NO EXISTE ");
    }
    else if (error instanceof HttpErrorResponse) {
      if (error.status != 200) {
        if (error.message) {
          this.presentAlert(error.message.split('autorizacion')[0]);
        }
      }
    } else if (error.error instanceof ProgressEvent) {
      this.presentAlert("NO SE PUEDE ACCEDER AL SERVICIO REVISE SU CONEXIÓN A INTERNET O VPN");
    }
    let errorMessage = '';
    if (error.status === 401) {
      let fecha = new Date();


      errorMessage = 'Error: ' + error.statusText;
      /* const ref = this.dialog.open(AuthDialogComponent, {
        data: {
          codigo: Preferences.getItem('date') == fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDay() ?'REFRESH':'CLOSE',
          mensaje: "Error " + error.statusText + " - " + error.message
        }
      });

      ref.afterClosed().subscribe((p:any)=>{
        if(p.respuesta){
          this.trs.getTokenApi().subscribe((h:any)=>{
            Preferences.setItem(environment.token_type,h.token_type );
            Preferences.setItem(environment.access_token,h.access_token );
            this.presentAlert('SE REINICIO EL TOKEN', 'success');
          });
        }

      })*/
    } else if (error.status === 403) {
      errorMessage = 'Error: ' + error.statusText;
      this.presentAlert("NO ESTA AUTENTICADO ");
    } else if (error.status === 500) {
      errorMessage = 'Error: ' + error.statusText;
    } else {
      errorMessage = 'Error: ' +
        (error.error === undefined || error.error === null ? error :
          error.error.mensaje === undefined || error.error.mensaje === null ? error.message : error.error.mensaje);
    }

    this.presentAlert(errorMessage);
  }



}
