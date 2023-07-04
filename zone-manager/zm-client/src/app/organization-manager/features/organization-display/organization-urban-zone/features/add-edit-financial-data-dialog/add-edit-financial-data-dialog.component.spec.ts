import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFinancialDataDialogComponent } from './add-edit-financial-data-dialog.component';

describe('AddEditFinancialDataDialogComponent', () => {
  let component: AddEditFinancialDataDialogComponent;
  let fixture: ComponentFixture<AddEditFinancialDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFinancialDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFinancialDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
