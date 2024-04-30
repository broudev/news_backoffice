import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRedactionNewsFormsComponent } from './edit-redaction-news-forms.component';

describe('EditRedactionNewsFormsComponent', () => {
  let component: EditRedactionNewsFormsComponent;
  let fixture: ComponentFixture<EditRedactionNewsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRedactionNewsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRedactionNewsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
