import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRendezVousComponent } from './table-rendez-vous.component';

describe('TableRendezVousComponent', () => {
  let component: TableRendezVousComponent;
  let fixture: ComponentFixture<TableRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRendezVousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
