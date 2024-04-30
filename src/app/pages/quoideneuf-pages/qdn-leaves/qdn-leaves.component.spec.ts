import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QdnLeavesComponent } from './qdn-leaves.component';

describe('QdnLeavesComponent', () => {
  let component: QdnLeavesComponent;
  let fixture: ComponentFixture<QdnLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QdnLeavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QdnLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
