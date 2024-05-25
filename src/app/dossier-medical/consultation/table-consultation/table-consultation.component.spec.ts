import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConsultationComponent } from './table-consultation.component';

describe('TableConsultationComponent', () => {
  let component: TableConsultationComponent;
  let fixture: ComponentFixture<TableConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableConsultationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
