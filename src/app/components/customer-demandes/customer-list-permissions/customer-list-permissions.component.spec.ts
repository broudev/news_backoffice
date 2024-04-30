import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListPermissionsComponent } from './customer-list-permissions.component';

describe('CustomerListPermissionsComponent', () => {
  let component: CustomerListPermissionsComponent;
  let fixture: ComponentFixture<CustomerListPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerListPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
