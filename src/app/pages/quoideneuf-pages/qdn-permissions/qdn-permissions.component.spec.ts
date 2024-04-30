import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QdnPermissionsComponent } from './qdn-permissions.component';

describe('QdnPermissionsComponent', () => {
  let component: QdnPermissionsComponent;
  let fixture: ComponentFixture<QdnPermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QdnPermissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QdnPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
