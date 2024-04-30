import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailCongesComponent } from './customer-detail-conges.component';

describe('CustomerDetailCongesComponent', () => {
  let component: CustomerDetailCongesComponent;
  let fixture: ComponentFixture<CustomerDetailCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerDetailCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
