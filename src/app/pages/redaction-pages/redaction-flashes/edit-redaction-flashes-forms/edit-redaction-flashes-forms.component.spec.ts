import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRedactionFlashesFormsComponent } from './edit-redaction-flashes-forms.component';

describe('EditRedactionFlashesFormsComponent', () => {
  let component: EditRedactionFlashesFormsComponent;
  let fixture: ComponentFixture<EditRedactionFlashesFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRedactionFlashesFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRedactionFlashesFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
