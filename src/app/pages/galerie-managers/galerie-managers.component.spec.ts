import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalerieManagersComponent } from './galerie-managers.component';

describe('GalerieManagersComponent', () => {
  let component: GalerieManagersComponent;
  let fixture: ComponentFixture<GalerieManagersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalerieManagersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalerieManagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
