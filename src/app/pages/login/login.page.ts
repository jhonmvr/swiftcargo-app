import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/services/authentication.service';
import { LoaderService } from 'src/services/loader.service';
import { PushNotificacionService } from 'src/services/push.notificacion.service';
import { StorageService } from 'src/services/storage.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	credentials: any = {};

	constructor(
		private fb: FormBuilder,
		private authService: AuthenticationService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoaderService,
		private storage: StorageService,
		private pushNotificacion: PushNotificacionService
	) { }

	ngOnInit() {
		this.credentials = this.fb.group({
			identificacion: ['', [Validators.required]],
			contrasena: ['', [Validators.required, Validators.minLength(4)]]
		});
	}

	async login() {
		//await this.loadingController.create();
		

		this.authService.AuthLogin(this.credentials.value).subscribe(
			async (res:any) => {
				console.log(" ress ==> ", res)
				await this.loadingController.dismiss();
				if (!res || !res.identificacion) {
					this.loadingController.dismiss();
					const alert = await this.alertController.create({
						header: 'Login failed',
						message: "CONTRASENA INCORRECTA",
						buttons: ['OK']
					});

					await alert.present();
					return;
				}
				
				Preferences.set({ key: "reUser", value: res.identificacion });
			
				
				await this.storage.setParameter();
				await this.storage.init();
				const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
	
				if (isPushNotificationsAvailable) {
					await this.pushNotificacion.registerNotifications();
				}
				
				
				
				if(res.tipoUsuario == 'CLIENTE'){
					this.router.navigateByUrl('/home/tracking-envios', { replaceUrl: true });
					return;
				}

				if(res.tipoUsuario == 'CONDUCTOR'){
					this.router.navigateByUrl('/home/conductor-envios', { replaceUrl: true });
					return;
				}
				
			},
			async (res) => {
				this.loadingController.dismiss();
				const alert = await this.alertController.create({
					header: 'Login failed',
					message: res.error.error,
					buttons: ['OK']
				});

				await alert.present();
			}
		);
	}

	// Easy access for form fields
	get identificacion() {
		return this.credentials.get('identificacion');
	}

	get contrasena() {
		return this.credentials.get('contrasena');
	}

	olvideContrasena() {
		this.router.navigate(['/olvide-contrasena']);

	}
	registrarse() {

		this.router.navigate(['/registrar']);

	}
}