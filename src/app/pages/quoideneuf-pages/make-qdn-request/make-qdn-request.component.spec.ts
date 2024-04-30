import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeQdnRequestComponent } from './make-qdn-request.component';

describe('MakeQdnRequestComponent', () => {
  let component: MakeQdnRequestComponent;
  let fixture: ComponentFixture<MakeQdnRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeQdnRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeQdnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
