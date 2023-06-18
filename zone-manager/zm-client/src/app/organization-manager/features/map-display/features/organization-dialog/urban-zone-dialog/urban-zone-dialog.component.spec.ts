import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrbanZoneDialogComponent } from './urban-zone-dialog.component';

describe('UrbanZoneDialogComponent', () => {
  let component: UrbanZoneDialogComponent;
  let fixture: ComponentFixture<UrbanZoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrbanZoneDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrbanZoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
