import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";
import {IconPaths} from "../../icon-store/IconPaths";

@Component({
  selector: 'app-map-control-container',
  templateUrl: './map-control-container.component.html',
  styleUrls: ['./map-control-container.component.scss']
})
export class MapControlContainerComponent implements OnInit{

  public iconNames: string[] = ['zone-add', 'zone-edit']

  constructor(private domSanitizer: DomSanitizer,
              private matIconRegistry: MatIconRegistry
  ) {
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
}
