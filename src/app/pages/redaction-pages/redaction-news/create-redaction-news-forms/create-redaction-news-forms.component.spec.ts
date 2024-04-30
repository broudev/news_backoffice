import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRedactionNewsFormsComponent } from './create-redaction-news-forms.component';

describe('CreateRedactionNewsFormsComponent', () => {
  let component: CreateRedactionNewsFormsComponent;
  let fixture: ComponentFixture<CreateRedactionNewsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRedactionNewsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRedactionNewsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
