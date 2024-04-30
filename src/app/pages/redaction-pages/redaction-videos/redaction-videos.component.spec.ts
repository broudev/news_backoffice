import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionVideosComponent } from './redaction-videos.component';

describe('RedactionVideosComponent', () => {
  let component: RedactionVideosComponent;
  let fixture: ComponentFixture<RedactionVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionVideosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
