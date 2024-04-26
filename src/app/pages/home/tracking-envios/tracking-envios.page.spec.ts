import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackingEnviosPage } from './tracking-envios.page';

describe('TrackingEnviosPage', () => {
  let component: TrackingEnviosPage;
  let fixture: ComponentFixture<TrackingEnviosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingEnviosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
