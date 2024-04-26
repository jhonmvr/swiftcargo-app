import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-gris',
  templateUrl: './header-gris.component.html',
  styleUrls: ['./header-gris.component.scss'],
})
export class HeaderGrisComponent implements OnInit {

  @Input() titulo: string= ""; 
  

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {}


  paginaAnterior(){
    this.navCtrl.back();
  }
}
