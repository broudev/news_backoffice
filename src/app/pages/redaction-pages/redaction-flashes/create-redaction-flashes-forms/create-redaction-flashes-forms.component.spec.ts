import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRedactionFlashesFormsComponent } from './create-redaction-flashes-forms.component';

describe('CreateRedactionFlashesFormsComponent', () => {
  let component: CreateRedactionFlashesFormsComponent;
  let fixture: ComponentFixture<CreateRedactionFlashesFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRedactionFlashesFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRedactionFlashesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
