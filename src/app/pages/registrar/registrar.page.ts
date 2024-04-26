import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Registro } from 'src/model/registro';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  form: FormGroup = new FormGroup({});
  identificacion = new FormControl('', [Validators.required, Validators.minLength(10),  Validators.maxLength(10)]);
  telefono = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]);
  terminos = new FormControl(false, [Validators.required]);
  publicidad = new FormControl(false);
 

  constructor(
    private router: Router,
    private loadingController: LoaderService,
		private fb: FormBuilder,
		private authService: AuthenticationService,
    private alertController: AlertController ,private navCtrl: NavController ) {

      this.form.addControl("identificacion", this.identificacion);
      this.form.addControl("telefono", this.telefono);
      this.form.addControl("terminos", this.terminos);
      this.form.addControl("publicidad", this.publicidad);
     }

  ngOnInit() {
    
  }

  async registrarme(){
    if(this.form.invalid || this.terminos.value == false){
      const alert = await this.alertController.create({
        header: 'Completa el formulario',
        subHeader: '',
        message: 'Verifica si los datos ingresados son correctos',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;

    }

    const loading = await this.loadingController.create();
    
   this.authService.registrarConToken(new Registro(this.form.value)).subscribe(async p=>{
    const alert = await this.alertController.create({
      header: 'FELICIDADES',
      subHeader: 'REGISTRO COMPLETADO CORRECTAMENTE',
      message: 'Te enviamos una contraseña temporal a tu número de teléfono :)',
      buttons: ['OK'],
    });
    
    this.loadingController.dismiss();
    await alert.present();
    this.router.navigate(['/login']);
    return;
    

   },async p=>{
    this.loadingController.dismiss();
    let error = '';
    if( p instanceof HttpErrorResponse ){
      error = p?.error.msgError
      
    }
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: '',
      message: error? error:'LO SENTIMOS TIENES PROBLEMAS PARA REGISTRARTE COMUNICATE CON TU ASESOR',
      buttons: ['OK'],
    });
    this.loadingController.dismiss();
    await alert.present();
    return;
   })

  }

  paginaAnterior(){
    this.navCtrl.back();
  }
}


