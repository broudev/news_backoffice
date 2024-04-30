import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoideneufRubriqueComponent } from './quoideneuf-rubrique.component';

describe('QuoideneufRubriqueComponent', () => {
  let component: QuoideneufRubriqueComponent;
  let fixture: ComponentFixture<QuoideneufRubriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoideneufRubriqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuoideneufRubriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
