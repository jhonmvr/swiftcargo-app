import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-rosa',
  templateUrl: './header-rosa.component.html',
  styleUrls: ['./header-rosa.component.scss'],
})
export class HeaderRosaComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  @Input() titulo: string= ""; 

  ngOnInit() {}

  paginaAnterior(){
    this.navCtrl.back();
  }

}
