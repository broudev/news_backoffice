import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoideneufLayoutComponent } from './quoideneuf-layout.component';

describe('QuoideneufLayoutComponent', () => {
  let component: QuoideneufLayoutComponent;
  let fixture: ComponentFixture<QuoideneufLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoideneufLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoideneufLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
