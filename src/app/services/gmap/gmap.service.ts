import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  private mapsLoaded = false;

  constructor() { }




  async printCurrentPosition():Promise<Position> {
    return  Geolocation.getCurrentPosition();

   
  };
 
  
}
