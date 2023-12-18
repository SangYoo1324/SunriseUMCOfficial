import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../commonComponents/section-title/section-title.component";
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {RouterModule} from "@angular/router";
import {SectionSeparatorComponent} from "../commonComponents/section-separator/section-separator.component";



@NgModule({
  declarations: [
    PageTitleComponent,
    SectionTitleComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SectionSeparatorComponent
  ],
  exports:[
    PageTitleComponent,
    SectionTitleComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export class CommonComponentModuleModule { }
