import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionNewsComponent } from './redaction-news.component';

describe('RedactionNewsComponent', () => {
  let component: RedactionNewsComponent;
  let fixture: ComponentFixture<RedactionNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
