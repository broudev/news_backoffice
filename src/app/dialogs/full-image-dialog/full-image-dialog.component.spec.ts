import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullImageDialogComponent } from './full-image-dialog.component';

describe('FullImageDialogComponent', () => {
  let component: FullImageDialogComponent;
  let fixture: ComponentFixture<FullImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullImageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
