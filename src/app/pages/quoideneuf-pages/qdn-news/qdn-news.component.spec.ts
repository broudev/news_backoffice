import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QdnNewsComponent } from './qdn-news.component';

describe('QdnNewsComponent', () => {
  let component: QdnNewsComponent;
  let fixture: ComponentFixture<QdnNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QdnNewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QdnNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
