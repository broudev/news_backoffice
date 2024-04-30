import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDemandesFormsComponent } from './full-demandes-forms.component';

describe('FullDemandesFormsComponent', () => {
  let component: FullDemandesFormsComponent;
  let fixture: ComponentFixture<FullDemandesFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullDemandesFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullDemandesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
