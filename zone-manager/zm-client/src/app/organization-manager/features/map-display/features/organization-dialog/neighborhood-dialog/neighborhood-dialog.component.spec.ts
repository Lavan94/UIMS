import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeighborhoodDialogComponent } from './neighborhood-dialog.component';

describe('NeighborhoodDialogComponent', () => {
  let component: NeighborhoodDialogComponent;
  let fixture: ComponentFixture<NeighborhoodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeighborhoodDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeighborhoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
