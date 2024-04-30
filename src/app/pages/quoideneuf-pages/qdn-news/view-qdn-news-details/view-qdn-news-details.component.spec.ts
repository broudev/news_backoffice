import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQdnNewsDetailsComponent } from './view-qdn-news-details.component';

describe('ViewQdnNewsDetailsComponent', () => {
  let component: ViewQdnNewsDetailsComponent;
  let fixture: ComponentFixture<ViewQdnNewsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewQdnNewsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewQdnNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
