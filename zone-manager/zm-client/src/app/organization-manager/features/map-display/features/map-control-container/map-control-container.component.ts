import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {IconPaths} from "../../../../../icon-store/IconPaths";
import {MapAction} from "../../action/MapAction";
import {MapDisplayComponent} from "../../map-display.component";
import {OwnerAuthService} from "../../../../../service/owner-auth.service";

@Component({
  selector: 'app-map-control-container',
  templateUrl: './map-control-container.component.html',
  styleUrls: ['./map-control-container.component.scss']
})
export class MapControlContainerComponent implements OnInit{
  @Input() public mapActions: MapAction[] = [];
  @Input() public parentMap?: MapDisplayComponent = undefined;

  public role: string = 'ADMINISTRATOR'

  constructor(private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry,
              private ownerAuthService: OwnerAuthService
  ) {
    this.role = ownerAuthService.getRole()
    this.registerIcons();
  }

  ngOnInit(): void {}

  private registerIcons() {
    const svgExtension = '.svg';
    IconPaths.forEach((icons, rootPath) => {
      icons.forEach((icon) => {
        this.matIconRegistry.addSvgIcon(
          icon,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            rootPath + icon + svgExtension
          )
        );
      });
    });
  }

  onClick(callback: Function) {
    if(this.parentMap){
      callback.call(this.parentMap);
    }
  }
}
