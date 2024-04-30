import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQdnPermissionsComponent } from './edit-qdn-permissions.component';

describe('EditQdnPermissionsComponent', () => {
  let component: EditQdnPermissionsComponent;
  let fixture: ComponentFixture<EditQdnPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditQdnPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditQdnPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
