import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3SunburstComponent } from './d3-sunburst.component';

describe('D3SunburstComponent', () => {
  let component: D3SunburstComponent;
  let fixture: ComponentFixture<D3SunburstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D3SunburstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D3SunburstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
