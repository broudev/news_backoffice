import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFlashContentsComponent } from './detail-flash-contents.component';

describe('DetailFlashContentsComponent', () => {
  let component: DetailFlashContentsComponent;
  let fixture: ComponentFixture<DetailFlashContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFlashContentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailFlashContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
