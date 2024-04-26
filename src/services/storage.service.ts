import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  tokeType: string | null = null;
  accessToken: string | null = null;
  keyUnencrypt: string = '';
  segRootContextUrl: string = '';
  segResourcesUrl: string = '';
  userRolServiceUrl: string = '';
  menuServiceUrl: string = '';
  appResourcesUrl: string = '';
  appWebSocketUrl: string = '';
  genericResourcesUrl: string = '';
  mongoDb: string = '';
  mongoAlertaColeccion: string = '';
  crmResourcesUrl: string = '';
  softBaseBankUrl: string = '';
  databaseName: string = '';
  estructuraArchivos: string = '';
  nuevaNotificacion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.init();
  }
 
  async init() {
    // If using, define drivers he  re: await this.storage.defineDriver(/*...*/);
    //console.log(" entra a contructor")
    const token_type = await Preferences.get({key:environment.token_type});
    const access_token = await Preferences.get({key:environment.access_token});
    this.tokeType = token_type.value;
    this.accessToken = access_token.value;
    
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    Preferences.set({key:key, value:value});
  }

  public get(key: string) {
     return Preferences.get({key:key}).then( p=> {
      return p.value
    });
  }


  public async setParameter() {
    //console.log(" entra a set parameter")
    let keyUnencrypt = await Preferences.get({key:environment.prefix +'RE011'});
    if(keyUnencrypt && keyUnencrypt.value){
      this.keyUnencrypt = atob( keyUnencrypt.value  );
    }
    //https://plataforma-oro.quski.ec:28888/quski-app/1.0.0/
    let segRootContextUrl = await Preferences.get({key: environment.prefix +  'RE001'});
    if(segRootContextUrl && segRootContextUrl.value){
      this.segRootContextUrl = atob(segRootContextUrl.value).replace(this.keyUnencrypt, '');
    }
    //https://plataforma-oro.quski.ec:28888/quski-gaf/1.0.0/
    let segResourcesUrl = await Preferences.get({key:environment.prefix +'RE002'});
    if( segResourcesUrl && segResourcesUrl.value ){
      this.segResourcesUrl = atob(segResourcesUrl.value).replace(this.keyUnencrypt, '');
    }
    
    let userRolServiceUrl = await Preferences.get({key:environment.prefix +'RE003'});
    if( userRolServiceUrl && userRolServiceUrl.value ){
      this.userRolServiceUrl = atob(userRolServiceUrl.value).replace(this.keyUnencrypt, '');
    }
    
    let menuServiceUrl = await Preferences.get({key:environment.prefix +'RE004'});
    if( menuServiceUrl && menuServiceUrl.value ){
      this.menuServiceUrl = atob(menuServiceUrl.value).replace(this.keyUnencrypt, '');
    }
    
    let appResourcesUrl = await Preferences.get({key:environment.prefix +'RE006'});
    if( appResourcesUrl && appResourcesUrl.value ){
      this.appResourcesUrl = atob(appResourcesUrl.value).replace(this.keyUnencrypt, '');
    }
     /* appResourcesUrl = await Preferences.get({key:environment.prefix +'RE005'});
    if( appResourcesUrl && appResourcesUrl.value ){
      this.appResourcesUrl = atob(appResourcesUrl.value).replace(this.keyUnencrypt, '');
    } */
    
    let appWebSocketUrl = await Preferences.get({key:environment.prefix +'RE007'});
    if( appWebSocketUrl && appWebSocketUrl.value ){
      this.appWebSocketUrl = atob(appWebSocketUrl.value).replace(this.keyUnencrypt, '');
    }
    
    let genericResourcesUrl = await Preferences.get({key:environment.prefix +'RE008'});
    if( genericResourcesUrl && genericResourcesUrl.value){
      this.genericResourcesUrl = atob(genericResourcesUrl.value).replace(this.keyUnencrypt, '');
    }
    

    
    let mongoDb = await Preferences.get({key:environment.prefix +'RE009'});
    if(mongoDb && mongoDb.value){
      this.mongoDb = atob(mongoDb.value).replace(this.keyUnencrypt, '');
    }
    let mongoAlertaColeccion = await Preferences.get({key:environment.prefix +'RE010'});
    if(mongoAlertaColeccion && mongoAlertaColeccion.value){
      this.mongoAlertaColeccion = atob(mongoAlertaColeccion.value).replace(this.keyUnencrypt, '');
    }
   
    let crmResourcesUrl = await Preferences.get({key:environment.prefix +'RE012'});
    if(crmResourcesUrl && crmResourcesUrl.value){
      this.crmResourcesUrl = atob(crmResourcesUrl.value).replace(this.keyUnencrypt, '');
    }
    
    let softBaseBankUrl = await Preferences.get({key:environment.prefix +'RE013'});
    if(softBaseBankUrl && softBaseBankUrl.value){
      this.softBaseBankUrl = atob(softBaseBankUrl.value).replace(this.keyUnencrypt, '');
    }
    this.appResourcesUrl = 'http://localhost:8080/api/v1/'
    this.softBaseBankUrl = this.segResourcesUrl;
    this.databaseName="quski-core-documento";
    this.estructuraArchivos="estructura-archivos";
    
} 

}