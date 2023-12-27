import {Component, ViewChild} from '@angular/core';
import {CommonComponentModuleModule} from "../../module/common-component-module.module";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

@Component({
  selector: 'app-various-contents',
  standalone: true,
  imports: [
    CommonComponentModuleModule
  ],
  templateUrl: './various-contents.component.html',
  styleUrl: './various-contents.component.css'
})
export class VariousContentsComponent {

  @ViewChild('sectionTitleComponent') sectionTitle!: SectionTitleComponent;
  ngAfterViewInit(){
    // section Title control
    this.sectionTitle.title.nativeElement.textContent = 'Other Contents';
    this.sectionTitle.subTitle.nativeElement.textContent = 'More Details of Contents';
  }
}
