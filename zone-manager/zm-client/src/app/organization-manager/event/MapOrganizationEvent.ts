import {Organization} from "../../model/Organization/Organization";

export interface MapOrganizationEvent {
  source: string;
  action: OrganizationMapEventAction;
  selectedOrganization?: Organization;
  parentOrganization?: Organization;
}

export enum OrganizationMapEventAction{
  CHANGE_ORG_TAB,
  SELECT_ORG_DISPLAY,
  SELECT_MAP_DISPLAY_ORG
}

export class ChangeOrganizationTabEvent implements MapOrganizationEvent{
  source: string = 'Organization-Display';
  action: OrganizationMapEventAction = OrganizationMapEventAction.CHANGE_ORG_TAB;
  selectedOrganization?: Organization;
  parentOrganization?: Organization;

  constructor(selectedOrganization?: Organization, parentOrganization?: Organization) {
    this.selectedOrganization = selectedOrganization;
    this.parentOrganization = parentOrganization;
  }
}

export class SelectOrganizationDisplayEvent implements MapOrganizationEvent{
  source: string = 'Organization-Display';
  action: OrganizationMapEventAction = OrganizationMapEventAction.SELECT_ORG_DISPLAY
  selectedOrganization?: Organization;
  parentOrganization?: Organization;

  constructor(selectedOrganization?: Organization, parentOrganization?: Organization) {
    this.selectedOrganization = selectedOrganization;
    this.parentOrganization = parentOrganization;
  }
}

export class SelectMapOrganizationEvent implements MapOrganizationEvent{
  source: string = 'Map-Display';
  action: OrganizationMapEventAction = OrganizationMapEventAction.SELECT_MAP_DISPLAY_ORG;
  selectedOrganization?: Organization;
  parentOrganization?: Organization;

  constructor(selectedOrganization?: Organization, parentOrganization?: Organization) {
    this.selectedOrganization = selectedOrganization;
    this.parentOrganization = parentOrganization;
  }
}

