import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-rosadito',
  templateUrl: './header-rosadito.component.html',
  styleUrls: ['./header-rosadito.component.scss'],
})
export class HeaderRosaditoComponent implements OnInit {

  @Input() titulo: string= "";

  constructor(private navCtrl: NavController ) { }

  ngOnInit() {}




  paginaAnterior(){
    this.navCtrl.back();
  }
}
