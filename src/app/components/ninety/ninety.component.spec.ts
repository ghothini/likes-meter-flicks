import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinetyComponent } from './ninety.component';

describe('NinetyComponent', () => {
  let component: NinetyComponent;
  let fixture: ComponentFixture<NinetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NinetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
