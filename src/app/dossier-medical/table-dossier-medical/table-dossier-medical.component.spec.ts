import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDossierMedicalComponent } from './table-dossier-medical.component';

describe('TableDossierMedicalComponent', () => {
  let component: TableDossierMedicalComponent;
  let fixture: ComponentFixture<TableDossierMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDossierMedicalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDossierMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
