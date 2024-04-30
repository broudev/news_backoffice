import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailPermissionsComponent } from './customer-detail-permissions.component';

describe('CustomerDetailPermissionsComponent', () => {
  let component: CustomerDetailPermissionsComponent;
  let fixture: ComponentFixture<CustomerDetailPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
