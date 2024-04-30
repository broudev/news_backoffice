import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QdnVideosComponent } from './qdn-videos.component';

describe('QdnVideosComponent', () => {
  let component: QdnVideosComponent;
  let fixture: ComponentFixture<QdnVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QdnVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QdnVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
