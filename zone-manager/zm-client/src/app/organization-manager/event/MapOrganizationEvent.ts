import {Organization} from "../../model/Organization/Organization";

export interface MapOrganizationEvent {
  source: string;
  action: string;
  dataOrganization?: Organization;
}

export class ChangeOrganizationTabEvent implements MapOrganizationEvent{
  source: string = 'Organization-Display';
  action: string = 'Change-Organization-Tab';
  dataOrganization?: Organization;

  constructor(dataOrganization?: Organization) {
    this.dataOrganization = dataOrganization;
  }
}

export class SelectOrganizationDisplayEvent implements MapOrganizationEvent{
  source: string = 'Organization-Display';
  action: string = 'Select-Organization-Display';
  dataOrganization?: Organization;

  constructor(dataOrganization?: Organization) {
    this.dataOrganization = dataOrganization;
  }
}

export class SelectMapOrganizationEvent implements MapOrganizationEvent{
  source: string = 'Map-Display';
  action: string = 'Select-Map-Organization';
  dataOrganization?: Organization;

  constructor(dataOrganization?: Organization) {
    this.dataOrganization = dataOrganization;
  }
}

