import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAuthorisationComponent } from './check-authorisation.component';

describe('CheckAuthorisationComponent', () => {
  let component: CheckAuthorisationComponent;
  let fixture: ComponentFixture<CheckAuthorisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckAuthorisationComponent]
    });
    fixture = TestBed.createComponent(CheckAuthorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
