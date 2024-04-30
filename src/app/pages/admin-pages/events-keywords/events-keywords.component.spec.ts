import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsKeywordsComponent } from './events-keywords.component';

describe('EventsKeywordsComponent', () => {
  let component: EventsKeywordsComponent;
  let fixture: ComponentFixture<EventsKeywordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsKeywordsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsKeywordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
