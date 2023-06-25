import {Component, OnInit} from '@angular/core';
import {OwnerService} from "./service/owner.service";
import {OwnerRole} from "../model/Owner";

@Component({
  selector: 'app-owner-manager',
  templateUrl: './owner-manager.component.html',
  styleUrls: ['./owner-manager.component.scss']
})
export class OwnerManagerComponent implements OnInit {
  public readonly administratorRole: OwnerRole = OwnerRole.ADMINISTRATOR
  public readonly serviceProviderRole: OwnerRole = OwnerRole.SERVICE_PROVIDER
  public readonly businessOwnerRole: OwnerRole = OwnerRole.BUSINESS_OWNER
  public readonly ownerRole: OwnerRole = OwnerRole.OWNER

  constructor(private ownerService: OwnerService) {
  }

  ngOnInit(): void {
    this.ownerService.getAllOwnersByRole(OwnerRole.ADMINISTRATOR).subscribe((result) => {
      console.log(result);
    })
  }

  public getRoleName(role: OwnerRole) {
    return this.ownerService.getRoleName(role);
  }
}
