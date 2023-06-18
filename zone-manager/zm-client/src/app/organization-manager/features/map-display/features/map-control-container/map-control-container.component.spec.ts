import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapControlContainerComponent } from './map-control-container.component';

describe('MapControlContainerComponent', () => {
  let component: MapControlContainerComponent;
  let fixture: ComponentFixture<MapControlContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapControlContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapControlContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
