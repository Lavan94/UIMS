import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationUrbanZoneComponent } from './organization-urban-zone.component';

describe('OrganizationUrbanZoneComponent', () => {
  let component: OrganizationUrbanZoneComponent;
  let fixture: ComponentFixture<OrganizationUrbanZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationUrbanZoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationUrbanZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
