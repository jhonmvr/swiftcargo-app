import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-franja-rosada',
  templateUrl: './franja-rosada.component.html',
  styleUrls: ['./franja-rosada.component.scss'],
})
export class FranjaRosadaComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}


  paginaAnterior(){
    this.navCtrl.back();
  }
}
