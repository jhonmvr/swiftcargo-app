import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonInput } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoaderService } from 'src/services/loader.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  form: FormGroup = new FormGroup({});
  contrasenaActual = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
  user = new FormControl('', []);
  contrasenaNueva = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
  repetirContrasena = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]);
  passwordIcon: string = 'eye';



  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoaderService,
    private storage: StorageService) {

    this.form.addControl("contrasenaActual", this.contrasenaActual);
    this.form.addControl("contrasenaNueva", this.contrasenaNueva);
    this.form.addControl("repetirContrasena", this.repetirContrasena);
    this.form.addControl("user", this.user);
  }

  ngOnInit() {
  }

  validarPass() {
    if (this.contrasenaNueva.value === this.repetirContrasena.value) {
      return 'no conicide';
    }
    return '';
  }

  async cambiarContrasena() {
    const loading = await this.loadingController.create();
    //
    let user = await this.storage.get('reUser' );
    this.user.setValue(user);
    

    (await this.authService.cambiarConToken(this.form.value)).subscribe(async p => {


      const alert = await this.alertController.create({
        header: 'CORRECTO',
        message: "TU CONTRASEÑA SE CAMBIO CORRECTAMENTE",
        buttons: ['OK']
      });

      await alert.present();
      this.router.navigate(['/login']);
      this.loadingController.dismiss();
      return;


    }, async p => {
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: "OCURRIO UN ERROR :(",
        buttons: ['OK']
      });

      await alert.present();
      this.router.navigate(['/login']);
      this.loadingController.dismiss();
      return;
    }
    )

  }


  togglePassword(input: IonInput) {
    const inputElement = input.getInputElement();
    input.type = input.type === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
}
