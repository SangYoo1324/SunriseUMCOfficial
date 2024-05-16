import {Component, NgModule, ViewChild} from '@angular/core';

import {AppModule} from "../../app.module";
import {ContentsBubbleComponent} from "../../commonComponents/contents-bubble/contents-bubble.component";
import {CommonModule} from "@angular/common";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

@Component({
  selector: 'app-various-contents',
  standalone: true,
  imports: [
    ContentsBubbleComponent,
    SectionTitleComponent,

  ],
  template: `<section>
    <div class="container">
      <app-section-title #sectionTitleComponent></app-section-title>

    <app-contents-bubble
    [contentsItems]="contentItems"
    [routeEnabled] = "true"
    ></app-contents-bubble>
    </div>


  </section>`,
  styles: [``]
})
export class VariousContentsComponent {

  contentItems:any[] = [
    {url: '/assets/eventPhoto_bubble.jpg',
      title: 'Photo Gallery',
      route: 'eventPhotos',

     },

    {url: '/assets/resources_bubble.jpg',
      title: 'Resources',
      route: 'donation',
    },
    {url: '/assets/contact_bubble.jpg',
      title: 'Contact Us',
      route: 'visitorsInfo',
      fragment:'Contact'
    }
  ];

  @ViewChild('sectionTitleComponent') sectionTitle!: SectionTitleComponent;
  ngAfterViewInit(){
    // section Title control
    this.sectionTitle.title.nativeElement.textContent = 'Other Contents';
    this.sectionTitle.subTitle.nativeElement.textContent = 'More Details of Contents';
  }


}
