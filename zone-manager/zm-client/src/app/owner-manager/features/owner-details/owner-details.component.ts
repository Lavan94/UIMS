import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Owner, OwnerDto, OwnerRole} from "../../../model/Owner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OwnerService} from "../../service/owner.service";

export enum OwnerDetailsOperation{
  SAVE,
  EDIT,
  CANCEL,
  DELETE
}

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit{
  @Input() owner: Owner = new Owner();
  @Input() ownerRole: OwnerRole = OwnerRole.NONE;

  @Output() operationEmitter: EventEmitter<[OwnerDetailsOperation, Owner?]> = new EventEmitter<[OwnerDetailsOperation, Owner?]>()

  public readonlyFlag = true;

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

  ngOnInit(): void {
    if(this.owner?.role === OwnerRole.NONE){
      this.owner.role = this.ownerRole;
      this.readonlyFlag = false;
    }
  }

  saveOwner(owner: Owner, password: string = '') {
    const ownerDto: OwnerDto = new OwnerDto(owner, password)
    this.ownerService.addOwner(ownerDto).subscribe(
      (serverOwner: Owner) => {
        console.log(serverOwner)
        this.owner = serverOwner;
        this.readonlyFlag = true;

        this.operationEmitter.emit([OwnerDetailsOperation.SAVE, owner]);
      }
    );
  }

  cancelOwner() {
    this.operationEmitter.emit([OwnerDetailsOperation.CANCEL, undefined]);
  }

  deleteOwner() {
    this.ownerService.deleteOwner(this.owner.id).subscribe(
      (owner) => {
        console.log('The following owner was deleted: ', owner)
        this.operationEmitter.emit([OwnerDetailsOperation.DELETE, owner]);
      }
    )
  }
}
