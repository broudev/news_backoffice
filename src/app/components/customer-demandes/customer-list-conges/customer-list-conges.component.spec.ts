import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListCongesComponent } from './customer-list-conges.component';

describe('CustomerListCongesComponent', () => {
  let component: CustomerListCongesComponent;
  let fixture: ComponentFixture<CustomerListCongesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerListCongesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerListCongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
