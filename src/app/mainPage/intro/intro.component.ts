import {Component, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {async, filter, find, map, Observable} from "rxjs";
import {Router, RouterLink} from "@angular/router";
import {ScrollServiceService} from "../../service/scroll-service.service";
import {NgIf} from "@angular/common";
import {LoadingMarkComponent} from "../../commonComponents/loading-mark/loading-mark.component";

@Component({
  selector: 'app-intro',
  standalone: true,
  template: `
    <section id="intro">
      <div class="container">
        <app-section-title #sectionTitleComponent>
          <p>His love is reaching out to you.</p>
        </app-section-title>
        <div class="row">
          <ng-container *ngIf="isLoading">
            <app-loading-mark></app-loading-mark>
          </ng-container>
          <div class="left col-lg-6">

            <iframe width="100%" height="350px" [src]="recentSermonObj?.iframe"
                    title="Build Angular Pagination Without a Library" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
            <button class="btn btn-outline-dark" (click)="goTo('newsActivities','SermonList')">Check Prev Sermons
            </button>

            <div class="pastor-intro card mb-3" style=" margin-top: 2rem">
              <div class="wrap row g-0">
                <div class="img_box col-md-4">
                  <img src="/assets/pastor2019.jpg" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">Pastor Jim Mozley</h5>
                    <p class="card-text">
                      As God's called servant to Pastor at Sunrise Christ Community Church I want to
                      personally invite you to come join us and share in the Light and Love of Jesus Christ,
                      the Son of God, our Savior and Lord. It is through Him we come into the intimacy and holiness of
                      God and
                      find salvation and true life. When a few disciples, right after his baptism, began to follow Jesus
                      he turned around and said, "What do you want?" They asked, "were are you staying?"
                      "Come." Jesus replied, "and you will see." All are welcome to come and see Jesus here, and
                      find rest for your souls(John 1:37-39; Matthew 11:28-30).
                    </p>
                    <p class="card-text"><small class="text-body-secondary"><a href="pastorjim@sunrisechristcc.org">pastorjim&#64;sunrisechristcc.org</a></small>
                    </p>
                    <p class="card-text"><small class="text-body-secondary">(253)-815-6925</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right col-lg-6">
            <div class="wrap">

              <h2>Hello, <span>We Are</span></h2>

              <p>
                sending all of you who visit us here a word of encouragement. No matter where we find
                ourselves God is there and is working all things together for your good (Rom. 8:28). In these
                times it is easy to be anxious and fearful. Yet, we can hear Jesus say, “Peace, do not be afraid.” Our
                Lord knows what is happening and walks with us each and every step. Jesus said, “Come to Me all who are
                weary and heavy laden (burdened) and I will give you rest.
                Take My yoke upon you, and learn from Me; for I am gentle and humble in heart, and you will find
                rest for your souls”-Matthew 11:28-29. Please join us every Sunday for worship at 10 am as we lift up
                Christ together. Also you will find us on Youtube at "SunriseChrist Community Church" God gives us
                enough for today and will lead us through the wilderness to safety. Proclaim daily Psalm 91:1-7. Peace
                of Christ be with you.
              </p>


              <div class="icon_group">
                <div class="link_wrap">
                  <div>Check Us also with :</div>
                  <a href="https://github.com/SangYoo1324"><i class="fa-brands fa-facebook"></i></a>
                  <a href="https://www.linkedin.com/in/sangbeomyoo"><i class="fa-brands fa-youtube"></i></a>
                </div>

              </div>

              <div class="nav_group">
                <div class="row nav_wrap">
                  <!--              <div class="group">-->
                  <div class="location nav_item" (click)="goTo('visitorsInfo', 'navPoint')">
                    <div class="text_wrap">
                      <div class="txt">Location</div>
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                  </div>
                  <div class="weekly_news nav_item" (click)="goTo('newsActivities', 'navPoint')">
                    <div class="text_wrap">
                      <div class="txt">News & Events</div>
                      <i class="fa-solid fa-newspaper"></i>
                    </div>
                  </div>
                  <!--              </div>-->
                  <!--              <div class=" group">-->
                  <div class="sermons nav_item" routerLink="/newsActivities/sermonDetail/1">
                    <div class="text_wrap">
                      <div class="txt">Sermons</div>
                      <i class="fa-sharp fa-solid fa-file-lines"></i>
                    </div>

                  </div>
                  <div class="online_give nav_item" routerLink="/donation">
                    <div class="text_wrap">
                      <div class="txt">Resources</div>
                      <i class="fa-solid fa-box"></i>
                    </div>
                  </div>

                  <div class="event_photos nav_item" routerLink="/eventPhotos">
                    <div class="text_wrap">
                      <div>Photos</div>
                      <i class="fa-solid fa-camera"></i>
                    </div>
                  </div>
                  <div class="contact nav_item" routerLink="/eventPhotos" (click)="goTo('visitorsInfo','Contact')">
                    <div class="text_wrap">
                      <div>Contact</div>
                      <i class="fa-solid fa-phone"></i>
                    </div>
                  </div>

                  <!--              </div>-->
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

  `,
  imports: [
    SectionTitleComponent,
    NgIf,
    LoadingMarkComponent,
    RouterLink
  ],
  styles: [`
    .left {
      height: fit-content;
    }

    .right {
      height: fit-content;
    }

    .pastor-intro {
      width: 100%;
    }

    .wrap {
      padding: 1.3rem;
      font-size: 1rem;
    }

    .img_box {
      display: flex;
      align-items: center;
    }

    .pastor-intro img {
      width: 10rem;
      height: 80%;
      padding: 0 0.7rem;
      /*border-radius: 3rem;*/
    }

    .card-body {
      font-size: 15px;
    }

    .card-text {
      font-size: 11px;
    }


    .icon_group {
      font-size: 1.5rem;
    }

    .link_wrap > div {
      color: #ed4848;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      text-decoration: underline;
    }

    .link_wrap {
      display: flex;
      justify-content: flex-end;
    }

    i {
      padding-left: 0.5rem;
    }

    .fa-youtube {
      color: red;
    }

    span {
      color: #ed4848;
    }

    /*nav_group */

    .nav_wrap {
      margin-top: 2rem;
      margin-left: 0.1rem;
    }

    .group {
      display: flex;
      margin-bottom: 0.5rem;
      padding: 0;
    }

    .nav_item {
      border-radius: 0.2rem;
      width: 24%;
      height: 90px;
      margin-right: 0.4rem;
      margin-bottom: 0.4rem;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 3px 3px 3px black;
      overflow: hidden;
    }


    .nav_item:hover {
      box-shadow: none;

    }

    .text_wrap > p, .text_wrap > i {
      display: block;
    }

    .text_wrap {
      width: 90%;
      display: flex;
      justify-content: space-between;
    }

    .nav_item:hover .text_wrap {
      scale: 1.1;
    }

    .text_wrap > div {
      color: white;
      font-size: 1.1rem;
    }

    .location {
      background-image: url("/assets/nav1.gif");
    }

    .weekly_news {
      background-image: url("/assets/nav2.gif");
    }

    .event_photos {
      background-image: url("/assets/nav3.gif");
    }

    .sermons {
      background-image: url("/assets/nav4.gif");
    }

    .online_give {
      background-image: url("/assets/nav1.gif");
    }


    .contact {
      background-image: url("/assets/nav2.gif");
    }

    /*nav_group:end */

    @media (max-width: 1386px) {

      .card-text {
        font-size: 11px;
      }

      .nav_wrap {
        width: 100%;
      }

      .left {
        height: fit-content;
      }

      .right {
        height: fit-content;
      }


      .p {
        font-size: 13px;
      }

      .text_wrap > div {
        color: white;
        font-size: 0.8rem;
      }

      .text_wrap > i {
        font-size: 0.8rem;
      }

      .jumbotron_text_box {
        width: 90%;
        transform: translate(-50%, -50%);
      }

      .btn_wrap {
        display: block;
      }

      .nav_item {
        width: 47.6%;
      }

    }

  `]
})
export class IntroComponent {

  //Title component 업데이트를 위해 title component 클래스 자체를 가져옴
  @ViewChild('sectionTitleComponent') sectionTitleComponent!: SectionTitleComponent;
  isLoading: boolean =true;

  sermonObservable$!:Observable<any>;
  recentSermon$!:Observable<any>;

  recentSermonObj!:any;
  // input으로 carousel 에 들어갈 slide info
  images:any[]= [
    {url: 'assets/VBS_1.jpg'},
    {url: 'assets/VBS_2.jpg'},
    {url: 'assets/VBS_3.jpg'},
    {url: 'assets/VBS_3.jpg'},
    {url: 'assets/VBS_3.jpg'}
  ];

  constructor(private contentService: ContentServiceService,
              private router: Router,
              private scrollService: ScrollServiceService
  ) {
  }
  ngOnInit():void{

   this.contentService.sermonDataStream.subscribe((subj)=>{

     this.recentSermon$ =
     subj.pipe(map((obj:any)=>{
       //배열sort 하고
       this.sortSermon(obj);
       console.log(obj);
       console.log(obj[0]);
       this.isLoading = false;
       return obj[0];
     }))
   });

   this.recentSermon$.subscribe(resp=>{
     this.recentSermonObj = resp;
   })
  }

  sortSermon(items:any){
    items.sort((a:any,b:any)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  }

  ngAfterViewInit(){
    this.sectionTitleComponent.subTitle.nativeElement.textContent = "Hello, Welcome to Sunrise Christ Community Church!";
    this.sectionTitleComponent.title.nativeElement.textContent = "You will find Jesus Here!";
  }

  goTo(target:string, fragment:string){
    this.scrollService.goTo(target, fragment);
  }


  protected readonly async = async;
}
