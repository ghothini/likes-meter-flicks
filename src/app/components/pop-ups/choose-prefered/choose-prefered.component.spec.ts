import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePreferedComponent } from './choose-prefered.component';

describe('ChoosePreferedComponent', () => {
  let component: ChoosePreferedComponent;
  let fixture: ComponentFixture<ChoosePreferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePreferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePreferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
