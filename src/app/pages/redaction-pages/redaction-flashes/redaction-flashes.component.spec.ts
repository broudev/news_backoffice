import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionFlashesComponent } from './redaction-flashes.component';

describe('RedactionFlashesComponent', () => {
  let component: RedactionFlashesComponent;
  let fixture: ComponentFixture<RedactionFlashesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionFlashesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionFlashesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
