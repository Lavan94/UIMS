import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerManagerComponent } from './owner-manager.component';

describe('OwnerManagerComponent', () => {
  let component: OwnerManagerComponent;
  let fixture: ComponentFixture<OwnerManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
