import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(public loadingController: LoadingController) { }

  // Simple loader
  simpleLoader() {
    this.loadingController.create({
      message: 'Loading...'
    }).then((response) => {
      response.present();
    });
  }
  // Dismiss loader
  dismiss() {
    this.loadingController.dismiss().then((response) => {
      //console.log('Loader closed!', response);
    }).catch((err) => {
      //console.log('Error occured : ', err);
    });
  }
  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'Loader hides after 4 seconds',
      duration: 4000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }   
  // Custom style + hide on tap loader
  create() {
    this.loadingController.create({
        message: '<p>Espere un momento...</p>',
        spinner: 'bubbles',
        translucent: true,
        cssClass: 'custom-loading',
        // showBackdrop: false,
    }).then((res) => {
      res.present();
    });
  }   
  createToProcessFirma() {
    this.loadingController.create({
        message: '<ion-img src="/assets/playground_assets/quski2.svg" alt="loading..."></ion-img>',
        cssClass: 'scale-down-center',
        translucent: true,
        showBackdrop: false,
        spinner: null
    }).then((res) => {
      res.present();
    });
  }   
}