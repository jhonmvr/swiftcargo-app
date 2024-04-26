import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { Registro } from 'src/model/registro';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const TOKEN_KEY = 'my-token';


@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	user: any = {};
	headers = new HttpHeaders({ 'Content-Type': 'application/json' });
	isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	token = '';

	constructor(private http: HttpClient, private storage: StorageService) {
		this.loadToken();
	}

	async loadToken() {
		const token = await this.storage.get( TOKEN_KEY );
		
			//console.log('set token: ', token);
			//this.token = token;
			this.isAuthenticated.next(true);
		
	}
	public setTokenNotificacionConToken(usuario: any): Observable<any> {
		return (this.getToken())
			.pipe(
				switchMap( tokenaouth => this.setTokenNotificacion(usuario, tokenaouth)
				));
	}
	setTokenNotificacion(usuario: any, tokenaouth: any): Observable<any> {
		//this.storage.tokeType = tokenaouth.token_type;
		//this.storage.accessToken = tokenaouth.access_token;
		let headers = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': tokenaouth.token_type +' ' +tokenaouth.access_token });
		let options = { headers: headers };
		return this.http.post(this.storage.segRootContextUrl+"autenticacion/setToken", usuario,options).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);
	}
	setTokenNotificacionS(usuario: any): Observable<any> {
		//this.storage.tokeType = tokenaouth.token_type;
		//this.storage.accessToken = tokenaouth.access_token;
	
		return this.http.post(this.storage.segRootContextUrl+"autenticacion/setToken", usuario).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);
	}

	login(credentials: { idUsuario: any, contrasena: any }, tokenaouth: any): Observable<any> {
		//console.log(">>>> login")
		
		this.storage.tokeType = tokenaouth.token_type;
		this.storage.accessToken = tokenaouth.access_token;
		return this.http.post(atob(environment.seg_a), credentials).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);
	}
	AuthLogin(credentials: { identificacion: any, contrasena: any }): Observable<any> {
		//console.log(">>>> login")
		
		
		return this.http.post(atob(environment.seg_a), credentials).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);
	}

	/* logout(): Promise<void> {
		this.isAuthenticated.next(false);
		//return this.storage.remove(TOKEN_KEY );
	} */

	registrarConToken(registro: Registro){
		return (this.getToken())
			.pipe(
				switchMap( tokenaouth => this.registrar(registro, tokenaouth)
					
				));
	}

	registrar(registro: Registro, tokenaouth: any) {
		const url=this.storage.segRootContextUrl+"autenticacion/registro";
		let options = { headers: this.headers };
		this.storage.tokeType = tokenaouth.token_type;
		this.storage.accessToken = tokenaouth.access_token;
		return this.http.post(url, registro, options).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);

	}

	async buscarUser() {

	}
	cambiarConToken(form: any){
		return (this.getToken())
			.pipe(
				switchMap( tokenaouth => this.cambiar(form, tokenaouth)
					
				));
	}
	 cambiar(form: any, tokenaouth:any): Observable<any> {
		
		console.log("this.user",this.user, this.user.value);
		this.storage.tokeType = tokenaouth.token_type;
		this.storage.accessToken = tokenaouth.access_token;
		let credentials = { idUsuario:form.user, contrasena: form.contrasenaActual, contrasenaNueva: form.contrasenaNueva }


		return this.http.post(atob(environment.seg_c), credentials).pipe(
			tap( // Log the result or error
				(data: any) => data,
				error => { /*this.HandleError(error, new ReNoticeService(),this.dialog);*/ }
			)
		);
	}


	public  getToken(): Observable<any> {
		//console.log("getToken login")
		const headersLoc = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const params = new HttpParams()
			.set("grant_type", 'password')
			.set("username", environment.user)
			.set("password", environment.password);
		let optionsLoc = {
			headers: headersLoc,
			params: params
		};
		
		this.storage.tokeType = "basic";
		this.storage.accessToken = environment.apitoken;
		
		let wp = {}
		return this.http.post<any>(atob(environment.api_t), wp, optionsLoc);
	}
	public  getTokenApi(dataParam: any): Observable<any> {
		//console.log(">>>>>getTokenApi")
		const headersLoc = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const params = new HttpParams()
			.set("grant_type", 'client_credentials');
		let optionsLoc = {
			headers: headersLoc,
			params: params
		};
		let keyUnencrypt = atob(dataParam[environment.prefix + 'RE011']);
		//Url de acceso al rootcontext de seguridad core-security-web
		let token = atob(dataParam[environment.prefix + 'RE021']).replace(keyUnencrypt, '');
		this.storage.tokeType = "basic";
		this.storage.accessToken = token;
		
		let wp = {}
		return this.http.post<any>(atob(environment.api_t), wp, optionsLoc);
	}

	public getRelative(): Observable<any> {
		//console.log("=========> ejecuta relative");

		const headersLoc = new HttpHeaders({
			//'Authorization':environment.authprefix+ token,
			'Content-Type': 'application/json'
		});
		const params = new HttpParams()
			.set("prefix", environment.prefix)
		let optionsLoc = {
			headers: headersLoc,
			params: params
		};
		//console.log("===>getRelative optionsLoc " + JSON.stringify( optionsLoc ));
		return this.http.get<any>(atob(environment.app_p), optionsLoc);
	}

	public serverLogin(authData: any): Observable<any> {
		return (this.getToken())
			.pipe(
				switchMap( tokenaouth => this.login(authData, tokenaouth)
					.pipe(
						switchMap( dataLogin =>  this.getRelative()
							.pipe(
								switchMap(  dataParam =>  (this.getTokenApi(dataParam))
									.pipe(
										switchMap( tokenApi => this.userReturn(tokenApi,dataLogin, dataParam,  authData)
										))
								))
						))
				));
	}

	private  userReturn(tokenApi: any,dataLogin: any, dataParam: any,credential: any): Observable<any> {

		this.storage.set( environment.token_type,  tokenApi.token_type );
		this.storage.set( environment.access_token,  tokenApi.access_token );
		this.storage.init();
		this.storage.setParameter();
		//console.log( "++>FLAT MAP BUSCANDO PARAMETROS: " ) ;
		//console.log( "++>FLAT MAP BUSCANDO PARAMETROS: dataLogin " ,dataLogin ) ;
		//console.log( "++>FLAT MAP BUSCANDO PARAMETROS: dataParam " ,dataParam ) ;
		//console.log( "++>FLAT MAP BUSCANDO PARAMETROS: dataRoles " ,tokenApi ) ;
		let x: any = {};
		if (dataLogin && dataLogin.CodigoServicio == "400") {
			x.mensajeError = dataLogin.Mensaje;
			return of(x);
		}



		if (dataLogin && dataLogin.idUsuario) {
			this.setRe000(dataParam);
			//console.log( "++>termino busqueda de usuario canal: " + JSON.stringify( dataLogin)) ;


			let x: any = {};
			x.id = 0;
			x.idUsuario = credential.idUsuario;
			x.username = credential.idUsuario;
			x.email = dataLogin.emailPrincipal;
			x.fullname = dataLogin.primerNombre;
			x.password = null;
			x.roles = ['USER'];
			x.accessToken = 'sin-token';
			x.existLogin = true;
			x.estado = dataLogin.estado;
			this.storage.set("reUser", dataLogin.idUsuario);
			this.storage.set("nombre", dataLogin.primerNombre);
			this.storage.set("email", dataLogin.emailPrincipal);
			this.storage.set("telefono", dataLogin.telefonoPrincipal);
			if (dataLogin.roles) {
				this.storage.set( environment.rolKey,  "99");
				this.storage.set( "re1001",  "99");

			}
			if (dataLogin.agencia) {
				this.storage.set("idAgencia", environment.agencia);
				this.storage.set("codigoAgencia",  environment.agencia);
				this.storage.set("nombreAgencia",  "agencia cliente");
				this.storage.set("direccionAgencia",  "direcion agencia");
				this.storage.set("idResidenciaAgencia",  "id ciudad agencia");
				this.storage.set("idTevcolAgencia",  "id ciudad tevcol");
			}
			//console.log( "++>FLAT MAP BUSCANDO Preturn of(x);: " ) ;

			return of(x);
		} else {

			//console.log("===================retorna false: " + JSON.stringify( dataLogin ));  
			let y: any = {};
			y.existLogin = false;
			if (!dataLogin || !dataLogin.entidad) {

				y.password = "ERROR EN LOGIN, USUARIO O CLAVE INCORRECTO, O EL USUARIO ESTA INACTIVO";
				return of(y);
			} else {
				y.password = "ERROR EN LOGIN, ERROR DESCONOCIDO CONSULTE A SU ADMINISTRADOR";
				return of(y);
			}
		}
	}

	public findByPkurl(id: string, serviceUrl: string) {
		let params = new HttpParams();
		params = params.set('id', id);
		let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		let options = { headers: headers, params: params };
		return this.http.get(serviceUrl, options);
	}

	public setRe000(re000: any) {
		//console.log("=======================> llenmando parametros " );
		//console.log("=======================> llenmando parametros " + JSON.stringify( re000 ) );
		if (re000) {
			for (var index = 1; index <= environment.paramsize; index++) {
				let key = environment.prefix + 'RE';
				if (index < 10) {
					key = key + '00' + index;
				} else {
					key = key + '0' + index;
				}
				let p = re000[key];
				//console.log("llenando parametro " + key + " valor " + p);
				this.storage.set( key, p);
			}
		}
	}
}