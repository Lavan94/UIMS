import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditOrganizationDialogComponent } from './add-edit-organization-dialog.component';

describe('AddOrganizationDialogComponent', () => {
  let component: AddEditOrganizationDialogComponent;
  let fixture: ComponentFixture<AddEditOrganizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditOrganizationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditOrganizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
