import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EightyComponent } from './eighty.component';

describe('EightyComponent', () => {
  let component: EightyComponent;
  let fixture: ComponentFixture<EightyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EightyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EightyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
