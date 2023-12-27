import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonComponentModuleModule} from "../../module/common-component-module.module";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonComponentModuleModule
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {

  @ViewChild('sectionTitle') sectionTitle!:SectionTitleComponent;

  ngAfterViewInit(){
    this.sectionTitle.title.nativeElement.textContent = 'Resources';
    this.sectionTitle.subTitle.nativeElement.textContent = 'Get some Useful Links!';
  }
}
