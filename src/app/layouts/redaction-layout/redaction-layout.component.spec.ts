import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionLayoutComponent } from './redaction-layout.component';

describe('RedactionLayoutComponent', () => {
  let component: RedactionLayoutComponent;
  let fixture: ComponentFixture<RedactionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactionLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedactionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
