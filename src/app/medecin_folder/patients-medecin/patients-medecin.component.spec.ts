import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsMedecinComponent } from './patients-medecin.component';

describe('PatientsMedecinComponent', () => {
  let component: PatientsMedecinComponent;
  let fixture: ComponentFixture<PatientsMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
