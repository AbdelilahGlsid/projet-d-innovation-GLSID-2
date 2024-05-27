import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationMedecinComponent } from './consultation-medecin.component';

describe('ConsultationMedecinComponent', () => {
  let component: ConsultationMedecinComponent;
  let fixture: ComponentFixture<ConsultationMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultationMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
