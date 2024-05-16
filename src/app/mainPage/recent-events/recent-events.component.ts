import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {CommonComponentModuleModule} from "../../module/common-component-module.module";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {ContentServiceService} from "../../service/content-service.service";
import {SwiperComponent} from "./swiper/swiper.component";
import {NewsItemComponent} from "./news-item/news-item.component";

@Component({
  selector: 'app-recent-events',
  standalone: true,
  imports: [
    CommonComponentModuleModule,
    NgStyle,
    NgForOf,
    NgClass,
    NgIf,
    SwiperComponent,
    NewsItemComponent
  ],
  template:`
    <section>

      <app-section-title #sectionTitleComponent></app-section-title>

      <div class="all">
        <div class="container">

          <app-swiper></app-swiper>

        </div>
      </div>

    </section>



    <style>

    </style>


  `,
  styles:[`

  `]
})
export class RecentEventsComponent {

  @Input() images:any[]=  [
    {url: "/assets/bible_study.jpg", title: "Adult Bible School", date: '01-17-2024',
      end: '05-18-2024',
      info:
    ""
    },

  ];

  news:any = [];


  three_recent_event = this.news.sort((a:any, b:any)=>
    new Date(b.date).getTime()-new Date(a.date).getTime()
  ).slice(0,3);

  @ViewChild('sectionTitleComponent') sectionTitleComponent!:SectionTitleComponent;
  @ViewChild('slideTrack') slideTrack!:ElementRef;

  selectedIndex= 0;
  constructor(private renderer:Renderer2,private contentService:ContentServiceService) {
  }

  ngOnInit(){
    this.contentService.newsStream.subscribe(subj=>{
      subj.subscribe((obs:any)=>{

        obs.sort((a:any, b:any)=>
          new Date(b.startDate).getTime()-new Date(a.startDate).getTime()
        ).slice(0,3);


        this.news =   obs.sort((a:any, b:any)=>
          new Date(b.startDate).getTime()-new Date(a.startDate).getTime()
        ).slice(0,3);

        console.log("news", this.news);
      })
    })
  }

  ngAfterViewInit(){
    this.sectionTitleComponent.subTitle.nativeElement.textContent = "Check Our upcoming event!";
    this.sectionTitleComponent.title.nativeElement.textContent = "Recent news";

    // this.autoSlideImages();
  }


}
