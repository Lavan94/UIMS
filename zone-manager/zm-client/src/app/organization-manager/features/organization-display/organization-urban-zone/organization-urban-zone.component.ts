import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Urban_Zone} from "../../../../model/Organization/Urban_Zone";
import {FinancialData} from "../../../../model/FinancialData";
import {MatDialog} from "@angular/material/dialog";
import {
  AddEditFinancialDataDialogComponent
} from "./features/add-edit-financial-data-dialog/add-edit-financial-data-dialog.component";
import {MatTable} from "@angular/material/table";
import {OwnerAuthService} from "../../../../service/owner-auth.service";

@Component({
  selector: 'app-organization-urban-zone',
  templateUrl: './organization-urban-zone.component.html',
  styleUrls: ['./organization-urban-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUrbanZoneComponent {
  @Input() currentUrbanZone: Urban_Zone = new Urban_Zone();
  @Input() parentComplex: string = '';
  @Input() parentNeighbourhood: string = '';
  @Input() parentSector: string = '';

  displayedColumns: string[] = ['date', 'income', 'employee', 'hotWater', 'coldWater', 'electricity', 'action']
  public role: string = "OWNER"

  @ViewChild(MatTable) table: MatTable<FinancialData> | undefined;

  constructor(public dialog: MatDialog, ownerAuthService: OwnerAuthService) {
    this.role = ownerAuthService.getRole();
  }

  getDate(date: Date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[date.getMonth()] + " " + date.getFullYear()
  }

  add() {
    this.openDialog().afterClosed().subscribe((financialResult) => {
      console.log(financialResult)
      if(!financialResult) return
      this.currentUrbanZone.utilityCosts.push(financialResult);
      this.table?.renderRows()
    })
  }

  edit(element: FinancialData) {
    this.openDialog(element).afterClosed().subscribe((financialResult) => {
      console.log(financialResult)
      if(!financialResult) return
      let utilityElements = this.currentUrbanZone.utilityCosts;
      const index = utilityElements.findIndex(elem => elem.id === financialResult.id);
      if (index >= 0) {
        utilityElements[index] = financialResult
        this.table?.renderRows()
      }
    })
  }

  openDialog(element?: FinancialData) {
    return this.dialog.open(AddEditFinancialDataDialogComponent, {
      data: element
    })
  }

  delete(element: FinancialData) {
    let utilityElements = this.currentUrbanZone.utilityCosts;
    const index = utilityElements.findIndex(elem => elem.id === element.id);
    if (index >= 0) {
      if(this.role === 'ADMINISTRATOR'){
        this.currentUrbanZone.utilityCosts = utilityElements.slice(0, index).concat(utilityElements.slice(index + 1))
        return;
      }
      if(this.role === 'BUSINESS'){
        this.currentUrbanZone.utilityCosts[index].income = 0;
        this.currentUrbanZone.utilityCosts[index].employee = 0;
        return;
      }

      if(this.role === 'SERVICE_PROVIDER'){
        this.currentUrbanZone.utilityCosts[index].coldWaterCost = 0;
        this.currentUrbanZone.utilityCosts[index].hotWaterCost = 0;
        this.currentUrbanZone.utilityCosts[index].electricityCost = 0;
        return;
      }
    }
  }

  getIncome(element: FinancialData) {
    const view = ['ADMINISTRATOR', 'BUSINESS', 'OWNER'].includes(this.role)
    if(!view) return '-';
    return element.income + " " + element.currency
  }

  getEmployeeExpense(element: FinancialData) {
    const view = ['ADMINISTRATOR', 'BUSINESS'].includes(this.role)
    if(!view) return '-';
    return element.employee + " " + element.currency
  }
}
