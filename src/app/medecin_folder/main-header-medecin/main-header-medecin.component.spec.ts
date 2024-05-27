import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderMedecinComponent } from './main-header-medecin.component';

describe('MainHeaderMedecinComponent', () => {
  let component: MainHeaderMedecinComponent;
  let fixture: ComponentFixture<MainHeaderMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainHeaderMedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainHeaderMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
