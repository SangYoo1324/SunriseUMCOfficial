import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-photo-detail',
  template:`

    <app-page-title #pageTitle></app-page-title>

    <div class="container">
      <a routerLink="/eventPhotos" class="back_btn">Back to List</a>
    </div>
    <!--    ngIf 를 이용해 eventPhotoObject$ observable이 생성된 순간 생성되도록 생성시기를 늦춤-->
    <!--    안그럼... 계속 생성이 안됨... ngOnInit()이 observable을 -->
    <!--    백엔드 서버에서 받아오느라 html보다 먼저 실행되버리기 때문에-->
    <div class="outer-wrap container mt-5"  *ngIf="(eventPhotoObject$ | async).foundPhoto as eventPhotoObject">
      <div class="info-wrap">
        <div class="row title_wrap">
          <div class="subject">Title</div>
          <div class="detail">{{eventPhotoObject!.title}}</div>
        </div>
        <div class="row title_wrap">
          <div class="subject">Poster</div>
          <div class="detail">Sunrise UMC</div>
        </div>
        <div class="row title_wrap">
          <div class="subject">Date</div>
          <div class="detail">{{eventPhotoObject!.date | date:'MMM d, y'}}</div>
        </div>

      </div>

      <div class="row date_wrap">


        <div class="photos">
          <img  *ngFor="let image of eventPhotoObject!.s3_urls" [src]="image" alt="">

        </div>
      </div>


      <!-- prev / next btn-->
      <div class="btn-wrap">
        <!--    ngIf 를 이용해 eventPhotoObject$ observable이 생성된 순간 생성되도록 생성시기를 늦춤-->
        <!--    안그럼... 계속 생성이 안됨... ngOnInit()이 observable을 -->
        <!--    백엔드 서버에서 받아오느라 html보다 먼저 실행되버리기 때문에-->
        <div class="each_btn_wrap" *ngIf="(eventPhotoObject$ | async) as eventPhotoObject">
          <button *ngIf = "eventPhotoObject.prevPostId"
                  type="button" class="nav_button btn btn btn-secondary" routerLink="/eventPhotos/photoDetail/{{eventPhotoObject.prevPostId}}/">prev</button>
          <div *ngIf = "!eventPhotoObject.prevPostId" class="page_indicator nav_button" >This is First Page</div>
        </div>

        <div class="each_btn_wrap" *ngIf="(eventPhotoObject$ | async) as eventPhotoObject">
          <button
            routerLink="/eventPhotos/photoDetail/{{eventPhotoObject.nextPostId}}"
            type="button" class="nav_button btn btn-secondary"
            *ngIf = "eventPhotoObject.nextPostId"
          >next</button>
          <div  *ngIf = "!eventPhotoObject.nextPostId" class="page_indicator nav_button">This is Last Page</div>
        </div>

      </div>

    </div>



    <style>

      .back_btn{
        width: 25%;
        color: cornflowerblue;
      }

      .outer-wrap{
        box-shadow: 0 10px 20px black;
        /*border: 1px solid black;*/
        margin-bottom: 2rem;
        border-radius: 0.3rem;
        background:linear-gradient(to left, rgba(255,255,255,0.7),rgba(255,255,255,.8)), url('/assets/letter.jpg');
        background-size: cover;
        padding: 2rem;
      }
      .title_wrap{
        /*border-bottom: 1px solid black;*/
        /*font-size: 2rem;*/
        font-weight: bold;
      }



      .date_wrap{
        font-size: 1.5rem;
        font-weight: bold;
      }

      .subject{
        margin-left: 1rem;
        width: 15%;
        box-shadow: 0 2px 2px black;
        text-align: center;
        padding: 0.5rem;
        font-size: 1.2rem;
      }
      .detail{
        font-size: 1.2rem;
        width: 70%;
        padding: .5rem;
        text-align: center;
      }

      .photos{
        padding: 2rem 2rem;
        text-align: center;
        margin-bottom:  1rem;
        /*border-top: 1px solid black;*/
      }

      img {
        max-width: 80%;
        height: auto;
        box-shadow: 0 10px 20px black;
        border-radius: 1rem;
        margin-bottom: 2rem;
      }

      /*navButton */
      .nav_button{
        display: block;
        margin: 0 1rem;
      }
      .btn-wrap{
        border-top: 1px solid black;
        padding-top: 2rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        margin-top: 2rem;
      }

      a{
        display: block;
        width: 250px;
        margin-top: 2rem;
        margin-left: auto;
        text-align: right;
        font-weight: bold;
        font-size: 1rem;
      }
      .each_btn_wrap{
        /*border: 2px solid black;*/
        /*border-radius: 5px;*/
        padding: 0.3rem .3rem;
        cursor: pointer;
        transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
      }

      .each_btn_wrap:hover{
        background-color: black;
        color: white;
      }
      /*navBtn:end */

      .info-wrap{
        color: lightgrey;
        padding: 0rem;
        background-color: rgba(0,0,0,0.5);
        box-shadow: 0 10px 20px black;
      }


      @media (max-width: 768px) {
        .outer-wrap{
          padding: 0.1rem;
        }
        .photos{
          padding: 0;
          padding-top: 2rem;

        }

        img {
          width: 100%;
          height: 250px;

        }
        .subject, .detail{
          font-size: 1em;
        }
      }

    </style>


  `,
  styles:[`

  `]
})
export class PhotoDetailComponent {

  @ViewChild('pageTitle') pageTitle!:PageTitleComponent;

  //total count of photos items
  endIndex!:number;
  // 게시글 index from router param
  photoIndexFromRouter!: number;
  // 게시글 객체 observable
  eventPhotoObject$!: Observable<any>;
  // Observable<{id:number,title:string,subTitle:string, date:string,s3_urls:string[] }>

  constructor(private contentService:ContentServiceService,
              private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){
    // getting end index with total number
    // this.contentService.fetchEventPhoto().pipe(map((items:any)=>items.length)).subscribe(
    //   (count)=>{
    //     this.endIndex = count;
    //     console.log('total count:', this.endIndex);
    //   }
    // );


    this.activatedRoute.paramMap.subscribe((param)=>{
      //activatedRoute 에서 해당 photos 게시글 id 추출
      this.photoIndexFromRouter = parseInt(param.get('id')!, 10); // index 추출
      console.log("targetId from Rotuer: " + this.photoIndexFromRouter);
      // 추출된 id 로 service의 eventPhotosObservable$ 에서 객체 추출
      this.eventPhotoObject$ =
    this.contentService.fetchEventPhoto()
      .pipe(map((items:any)=>{
        const photoIndex = items.findIndex((post:any)=>post.id === this.photoIndexFromRouter);
        const foundPhoto = items[photoIndex];
        const totalEventPhotos = items.length;
        const nextPostId = photoIndex<totalEventPhotos-1?  items[photoIndex+1].id : null
        const prevPostId =  photoIndex>0?  items[photoIndex-1].id : null
        return {photoIndex, totalEventPhotos,foundPhoto, nextPostId, prevPostId};
      }));
      // id에 맞는 이벤트 객체를 추출했나 확인
   this.eventPhotoObject$.subscribe((item)=>{
     this.endIndex = item.totalEventPhotos-1;
     console.log(item);});
    });

  }

  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Event Photos';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Check Our Events & Memories!';

  }
}
