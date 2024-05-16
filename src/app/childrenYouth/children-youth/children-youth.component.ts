import {Component, ViewChild} from '@angular/core';
import {ChildrenYouthIntroComponent} from "../children-youth-intro/children-youth-intro.component";
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";

import {AppModule} from "../../app.module";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";
import {YouthContentsComponent} from "../youth-contents/youth-contents.component";

@Component({
  selector: 'app-children-youth',
  standalone: true,
  template: `
    <app-page-title #childrenYouthTitle></app-page-title>
    <app-children-youth-intro></app-children-youth-intro>
    <app-section-separator></app-section-separator>
    <app-youth-contents></app-youth-contents>

  `,
  imports: [
    SectionSeparatorComponent,
    ChildrenYouthIntroComponent,
    YouthContentsComponent,
    PageTitleComponent
  ],
  styles: [
    `

    `
  ]
})
export class ChildrenYouthComponent {

  @ViewChild('childrenYouthTitle') pageTitle!: PageTitleComponent;

  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Children & Youth';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Always welcome to visit with kids';
  }
}
