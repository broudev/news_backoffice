import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoideneufWelcomeComponent } from './quoideneuf-welcome.component';

describe('QuoideneufWelcomeComponent', () => {
  let component: QuoideneufWelcomeComponent;
  let fixture: ComponentFixture<QuoideneufWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoideneufWelcomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoideneufWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
