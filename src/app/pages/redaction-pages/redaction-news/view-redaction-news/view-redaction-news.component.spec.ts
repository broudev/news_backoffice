import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRedactionNewsComponent } from './view-redaction-news.component';

describe('ViewRedactionNewsComponent', () => {
  let component: ViewRedactionNewsComponent;
  let fixture: ComponentFixture<ViewRedactionNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRedactionNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRedactionNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
