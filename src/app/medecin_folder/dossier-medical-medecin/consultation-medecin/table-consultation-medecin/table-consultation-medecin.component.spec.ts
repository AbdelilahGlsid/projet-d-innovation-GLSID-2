import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConsultationMedecinComponent } from './table-consultation-medecin.component';

describe('TableConsultationMedecinComponent', () => {
  let component: TableConsultationMedecinComponent;
  let fixture: ComponentFixture<TableConsultationMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableConsultationMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableConsultationMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
