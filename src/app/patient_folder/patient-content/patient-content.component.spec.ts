import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientContentComponent } from './patient-content.component';

describe('PatientContentComponent', () => {
  let component: PatientContentComponent;
  let fixture: ComponentFixture<PatientContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
