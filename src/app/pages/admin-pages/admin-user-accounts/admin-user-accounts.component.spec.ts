import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAccountsComponent } from './admin-user-accounts.component';

describe('AdminUserAccountsComponent', () => {
  let component: AdminUserAccountsComponent;
  let fixture: ComponentFixture<AdminUserAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminUserAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
