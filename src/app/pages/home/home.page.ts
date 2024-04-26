import { AfterContentInit, AfterViewInit, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { OperacionServiceService } from 'src/services/operacion-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  form!: FormGroup;
  isSubmitted = false;
  openModal = false;
  pos!:any;
  TIME_INTERVAL = 50000

  constructor( private router: Router, private route: ActivatedRoute,private operacionServiceService:OperacionServiceService) {
    this.route.paramMap.subscribe( (params:any) => {
      this.pos = params.params;
    })
  }
  ngAfterViewInit(): void {
    timer(50000, this.TIME_INTERVAL).subscribe(async p => {
          
     
      this.operacionServiceService.buscarEnvioById(this.pos.id).subscribe(async (p: any) => {
        console.log("p>>>>>>>>>>", p)
        this.pos = p;
      });
    })
  }

  openLocationModal() {
    this.openModal = true;
    this.formData();
  }

  formData() {
    this.form = new FormGroup({
      lat: new FormControl(null, {validators: [Validators.required]}),
      lng: new FormControl(null, {validators: [Validators.required]}),
    });
  }


  async onSubmit() {
    if(!this.form.valid) return;
    try {
      this.isSubmitted = true;
      // update location
      const source = {
        lat: this.form.value.lat,
        lng: this.form.value.lng
      };
      console.log(source);
      
      this.isSubmitted = false;
      this.openModal = false;
    } catch(e) {
      this.isSubmitted = false;
      console.log(e);
    }
  }

}
