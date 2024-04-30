import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionCustomersNewsListComponent } from './redaction-customers-news-list.component';

describe('RedactionCustomersNewsListComponent', () => {
  let component: RedactionCustomersNewsListComponent;
  let fixture: ComponentFixture<RedactionCustomersNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionCustomersNewsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionCustomersNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
