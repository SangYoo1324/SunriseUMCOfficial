import {Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {SectionTitleComponent} from "../../../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../../../service/content-service.service";
import {buildEntryKey} from "@fullcalendar/core/internal";

@Component({
  selector: 'app-news-item',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgStyle
  ],
  template: `
    <div #news class="row" *ngFor="let images of news; let i = index">
      <div class="col-lg-5 image-section">
        <div class="img"
             [ngStyle]="{'background-image': 'url('+images.s3_url+')'}"
        ></div>

      </div>


      <div class="col-lg-7 description">

        <div class="wrap">

          <div class="title">
            <h3>{{images.title}}</h3>
          </div>
          <div class="day-occurance">
            <h5>{{images.startDate.slice(0,10)}} ~ {{images.endDate.slice(0,10)}}</h5>
            <h5 > <small *ngIf="images.recurring">Every</small>
              <small *ngIf="!images.recurring">Starting</small>
              {{images.dayOfWeek}}</h5>
          </div>

          <p>
            {{
            images.description
            }}
          </p>
        </div>

      </div>


    </div>
  `,
  styles:[`
    .row{
      box-shadow: 10px 10px 20px black;
      /* max-height: 500px; */
      margin-bottom: 2rem;
      transition: transform 1s ease-in-out;
      transform: translateX(-80%);
    }

    .shadow-1{

    }

    .image-section{
     
      padding: 1rem;

    }

    .img{
      padding: 1rem;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 0;
      padding-bottom: 85%;
    
    }

    .wrap{
      margin-top: 1rem;
      padding: 1rem  2.2rem;
    }

    .day-occurance{
      width: 100%;
      color: #ed4848;
      text-align: right;
      margin: 1rem 0;
    }


    @media (max-width: 1024px) {
      .row{
        max-height: 1000px;
      }
      .image-section{
        min-height: 300px;
      }

      .shadow-1{
        box-shadow: none;
        border-bottom: 1px solid gray;
      }
      .description{
        padding: 0;
        font-size: .8rem;
      }

    }
  `]
})
export class NewsItemComponent {
  news:any = [];

  @ViewChildren('news') newsElements!: QueryList<ElementRef>;

  three_recent_event = this.news.sort((a:any, b:any)=>
    new Date(b.date).getTime()-new Date(a.date).getTime()
  ).slice(0,3);

  @ViewChild('sectionTitleComponent') sectionTitleComponent!:SectionTitleComponent;
  @ViewChild('slideTrack') slideTrack!:ElementRef;

  selectedIndex= 0;

  intersectionObserver!:IntersectionObserver;



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

    this.intersectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(e=>{
        if(e.isIntersecting){
          this.renderer.setStyle(e.target, 'transform', 'translateX(0)');
          console.log("news intersecting");
        }else{
          this.renderer.setStyle(e.target, 'transform', 'translateX(-50%)')
        }
      })
    }
    )

    this.newsElements.changes.subscribe((elements: QueryList<ElementRef>) => {
      elements.forEach((newsElement: ElementRef) => {
        this.intersectionObserver.observe(newsElement.nativeElement);
      });
    });

    this.newsElements.forEach(newsElement => {
      this.intersectionObserver!.observe(newsElement.nativeElement);
    });
  }

  ngOnDestroy() {
    // 컴포넌트가 파괴될 때 옵저버를 해제
    if (this.intersectionObserver) {
      this.newsElements.forEach(newsElement => {
        this.intersectionObserver!.unobserve(newsElement.nativeElement);
      });
      this.intersectionObserver.disconnect();
    }
  }
}
