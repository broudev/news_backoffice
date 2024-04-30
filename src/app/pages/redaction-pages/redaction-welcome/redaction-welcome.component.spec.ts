import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionWelcomeComponent } from './redaction-welcome.component';

describe('RedactionWelcomeComponent', () => {
  let component: RedactionWelcomeComponent;
  let fixture: ComponentFixture<RedactionWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
