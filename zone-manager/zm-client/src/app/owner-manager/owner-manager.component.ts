import {Component, OnInit} from '@angular/core';
import {OwnerService} from "./service/owner.service";
import {Owner, OwnerRole} from "../model/Owner";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-owner-manager',
  templateUrl: './owner-manager.component.html',
  styleUrls: ['./owner-manager.component.scss']
})
export class OwnerManagerComponent implements OnInit {
  public selectedIndex = new FormControl(0);

  public readonly administratorRole: OwnerRole = OwnerRole.ADMINISTRATOR
  public readonly serviceProviderRole: OwnerRole = OwnerRole.SERVICE_PROVIDER
  public readonly businessOwnerRole: OwnerRole = OwnerRole.BUSINESS_OWNER
  public readonly ownerRole: OwnerRole = OwnerRole.OWNER

  public administrators: Owner[] = []
  public serviceProviders: Owner[] = []
  public businessOwners: Owner[] = []
  public owners: Owner[] = []

  constructor(private ownerService: OwnerService) {
  }

  ngOnInit(): void {
    this.ownerService.getAllOwnersByRole(OwnerRole.ADMINISTRATOR).subscribe((owners) => {
      this.administrators = owners;
    })
    this.ownerService.getAllOwnersByRole(OwnerRole.SERVICE_PROVIDER).subscribe((owners) => {
      this.serviceProviders = owners;
    })
    this.ownerService.getAllOwnersByRole(OwnerRole.BUSINESS_OWNER).subscribe((owners) => {
      this.businessOwners = owners;
    })
    this.ownerService.getAllOwnersByRole(OwnerRole.OWNER).subscribe((owners) => {
      this.owners = owners;
    })
  }

  public getRoleName(role: OwnerRole) {
    return this.ownerService.getRoleName(role);
  }

  onOwnerRoleChanged($event: Owner) {
    const roles: string[] = Object.keys(OwnerRole)
    let index: number = 0;
    switch ($event.role){
      case OwnerRole.ADMINISTRATOR:
        index = 0;
        this.administrators.push($event)
        break;
      case OwnerRole.SERVICE_PROVIDER:
        index = 1;
        this.serviceProviders.push($event)
        break;
      case OwnerRole.BUSINESS_OWNER:
        index = 3;
        this.businessOwners.push($event)
        break;
      case OwnerRole.OWNER:
        index = 4;
        this.owners.push($event)
        break;
    }
    this.selectedIndex.setValue(index);
  }

  changeOwnerTab($event: number) {
    this.selectedIndex.setValue($event.valueOf())
  }
}
