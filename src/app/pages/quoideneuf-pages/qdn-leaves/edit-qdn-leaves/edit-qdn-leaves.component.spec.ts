import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQdnLeavesComponent } from './edit-qdn-leaves.component';

describe('EditQdnLeavesComponent', () => {
  let component: EditQdnLeavesComponent;
  let fixture: ComponentFixture<EditQdnLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQdnLeavesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQdnLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
