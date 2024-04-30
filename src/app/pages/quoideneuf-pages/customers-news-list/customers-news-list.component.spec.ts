import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersNewsListComponent } from './customers-news-list.component';

describe('CustomersNewsListComponent', () => {
  let component: CustomersNewsListComponent;
  let fixture: ComponentFixture<CustomersNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersNewsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
