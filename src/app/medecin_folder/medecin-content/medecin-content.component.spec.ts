import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinContentComponent } from './medecin-content.component';

describe('MedecinContentComponent', () => {
  let component: MedecinContentComponent;
  let fixture: ComponentFixture<MedecinContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedecinContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecinContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
