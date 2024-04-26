import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotificacionService {
  constructor(private authService: AuthenticationService, private storage: StorageService) {
    
  }


 
  async init() {
    // If using, define drivers he  re: await this.storage.defineDriver(/*...*/);
  
    
  }

  async addListeners () {
    console.log(' addListeners');
    
    await PushNotifications.addListener('registration', async token => {
      console.log('Registration token>>>>>: ', token);
      const reUser = await Preferences.get({key:"reUser"});
      this.storage.set("tokenNotificacion",token.value);
      if(reUser && reUser.value){
        this.authService.setTokenNotificacionS({idUsuario: reUser.value, tokenNotificacion: token.value }).subscribe(p=>{

        });
      }
      

    }).then();
  
    await PushNotifications.addListener('registrationError', err => {
      console.log('Registration error: ', err.error);
    }).then();
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      this.storage.nuevaNotificacion.next(true);
    }).then();
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    }).then();
    this.getDeliveredNotifications();
  }
  
  async registerNotifications () {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register().then();
    await this.addListeners();
  }
  
  async getDeliveredNotifications () {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

}