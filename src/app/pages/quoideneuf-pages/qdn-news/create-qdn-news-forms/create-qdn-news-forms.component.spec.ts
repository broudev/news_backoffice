import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQdnNewsFormsComponent } from './create-qdn-news-forms.component';

describe('CreateQdnNewsFormsComponent', () => {
  let component: CreateQdnNewsFormsComponent;
  let fixture: ComponentFixture<CreateQdnNewsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQdnNewsFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateQdnNewsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
