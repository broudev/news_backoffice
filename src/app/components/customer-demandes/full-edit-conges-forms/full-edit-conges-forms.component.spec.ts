import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEditCongesFormsComponent } from './full-edit-conges-forms.component';

describe('FullEditCongesFormsComponent', () => {
  let component: FullEditCongesFormsComponent;
  let fixture: ComponentFixture<FullEditCongesFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullEditCongesFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullEditCongesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
