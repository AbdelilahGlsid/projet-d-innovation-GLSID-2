import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderPatientComponent } from './main-header-patient.component';

describe('MainHeaderPatientComponent', () => {
  let component: MainHeaderPatientComponent;
  let fixture: ComponentFixture<MainHeaderPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainHeaderPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHeaderPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
