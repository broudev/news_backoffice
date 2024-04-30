import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullEditPermissionsFormsComponent } from './full-edit-permissions-forms.component';

describe('FullEditPermissionsFormsComponent', () => {
  let component: FullEditPermissionsFormsComponent;
  let fixture: ComponentFixture<FullEditPermissionsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullEditPermissionsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullEditPermissionsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
