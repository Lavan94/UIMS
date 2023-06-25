import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Owner, OwnerDto, OwnerRole} from "../../../model/Owner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OwnerService} from "../../service/owner.service";

export enum OwnerDetailsOperation {
  CANCEL,
  DELETE,
  ROLE_CHANGE
}

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {
  @Input() owner: Owner = new Owner();
  @Input() inputRole: OwnerRole = OwnerRole.NONE;

  public readonly administratorRole: OwnerRole = OwnerRole.ADMINISTRATOR
  public readonly serviceProviderRole: OwnerRole = OwnerRole.SERVICE_PROVIDER
  public readonly businessOwnerRole: OwnerRole = OwnerRole.BUSINESS_OWNER
  public readonly ownerRole: OwnerRole = OwnerRole.OWNER

  @Output() operationEmitter: EventEmitter<[OwnerDetailsOperation, Owner?]> = new EventEmitter<[OwnerDetailsOperation, Owner?]>()

  public readonlyFlag = true;
  public editMode = false;

  public usernameValid: boolean = false;
  public emailValid: boolean = false;
  public phoneValid: boolean = false;

  public password: string = '';

  ownerForm = new FormGroup({
    id: new FormControl(this.owner.id),
    username: new FormControl(
      this.owner.username, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])/)
      ]
    ),
    email: new FormControl(
      this.owner.email, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]
    ),
    phone: new FormControl(
      this.owner.email, [
        Validators.required,
        Validators.pattern(/^\d{4} \d{3} \d{3}$/)
      ]
    ),
    password: new FormControl(
      this.password, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]
    ),
  })

  constructor(private ownerService: OwnerService) {
  }

  public ngOnInit(): void {
    if (this.owner?.role === OwnerRole.NONE) {
      this.owner.role = this.inputRole;
      this.readonlyFlag = false;
    }
  }

  public saveOwner(owner: Owner, password: string = '') {
    if(!this.ownerForm.valid && this.password === '' && this.owner.id === '') return;

    const ownerDto: OwnerDto = new OwnerDto(owner, password)
    this.editMode ? this.updateOwner(ownerDto) : this.createOwner(ownerDto)
  }

  public cancelOwner() {
    this.operationEmitter.emit([OwnerDetailsOperation.CANCEL, undefined]);
  }

  public deleteOwner() {
    this.ownerService.deleteOwner(this.owner.id).subscribe(
      (owner) => {
        console.log('The following owner was deleted: ', owner)
        this.operationEmitter.emit([OwnerDetailsOperation.DELETE, owner]);
      }
    )
  }

  public editOwner() {
    this.readonlyFlag = false;
    this.editMode = true;
  }

  public getRoleName(role: OwnerRole) {
    return this.ownerService.getRoleName(role);
  }

  private createOwner(ownerDto: OwnerDto) {
    this.ownerService.addOwner(ownerDto).subscribe(
      (serverOwner: Owner) => {
        console.log(serverOwner)
        this.owner = serverOwner;
        this.readonlyFlag = true;
      }
    );
  }

  private updateOwner(ownerDto: OwnerDto) {
    this.ownerService.editOwner(ownerDto).subscribe(
      (serverOwner: Owner) => {
        console.log(serverOwner)
        this.owner = serverOwner;
        this.readonlyFlag = true;
        this.editMode = false;
      }
    );
  }

  changeRole(role: OwnerRole) {
    console.log(role);
    this.owner.role = role;
    this.ownerService.changeOwnerRole(this.owner.id, role).subscribe(() => {
      this.operationEmitter.emit([OwnerDetailsOperation.ROLE_CHANGE, this.owner])
    })
  }
}
