import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributePillComponent } from './attribute-pill.component';

describe('AttributePillComponent', () => {
  let component: AttributePillComponent;
  let fixture: ComponentFixture<AttributePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributePillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
