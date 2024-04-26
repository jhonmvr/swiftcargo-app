import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrakingEnvioConductorComponent } from './traking-envio-conductor.component';

describe('TrakingEnvioConductorComponent', () => {
  let component: TrakingEnvioConductorComponent;
  let fixture: ComponentFixture<TrakingEnvioConductorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrakingEnvioConductorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrakingEnvioConductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
