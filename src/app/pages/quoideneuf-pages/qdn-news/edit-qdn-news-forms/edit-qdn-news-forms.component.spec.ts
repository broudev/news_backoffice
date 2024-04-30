import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQdnNewsFormsComponent } from './edit-qdn-news-forms.component';

describe('EditQdnNewsFormsComponent', () => {
  let component: EditQdnNewsFormsComponent;
  let fixture: ComponentFixture<EditQdnNewsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQdnNewsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQdnNewsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
