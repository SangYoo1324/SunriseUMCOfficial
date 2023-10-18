import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {map, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.css']
})
export class PhotoDetailComponent {

  @ViewChild('pageTitle') pageTitle!:PageTitleComponent;

  //total count of photos items
  endIndex!:number;
  // 게시글 index from router param
  photoIndexFromRouter!: number;
  // 게시글 객체 observable
  eventPhotoObject$!: Observable<{id:number,title:string,subTitle:string, date:string,cloudinaryUrl:string[] }>;

  constructor(private contentService:ContentServiceService,
              private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){
    // getting end index with total number
    this.contentService.fetchEventPhoto().pipe(map((items:any)=>items.length)).subscribe(
      (count)=>{
        this.endIndex = count;
        console.log('total count:', this.endIndex);
      }
    );


    this.activatedRoute.paramMap.subscribe((param)=>{
      //activatedRoute 에서 해당 photos 게시글 id 추출
      this.photoIndexFromRouter = parseInt(param.get('id')!, 10); // index 추출
      console.log("targetId from Rotuer: " + this.photoIndexFromRouter);
      // 추출된 id 로 service의 eventPhotosObservable$ 에서 객체 추출
      this.eventPhotoObject$ =
    this.contentService.fetchEventPhoto()
      .pipe(map((items:any)=>items.find((post:any)=>post.id === this.photoIndexFromRouter)));
      // id에 맞는 이벤트 객체를 추출했나 확인
   this.eventPhotoObject$.subscribe((item)=>{console.log(item);});
    });

  }

  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Event Photos';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Check Our Events & Memories!';

  }
}
