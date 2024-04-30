import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionRubriqueComponent } from './redaction-rubrique.component';

describe('RedactionRubriqueComponent', () => {
  let component: RedactionRubriqueComponent;
  let fixture: ComponentFixture<RedactionRubriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionRubriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
