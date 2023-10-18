import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../service/content-service.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-event-photos',
  templateUrl: './event-photos.component.html',
  styleUrls: ['./event-photos.component.css']
})
export class EventPhotosComponent {

  searchMode!:boolean;

  //pagination related Variables
  currentPage:number= 1;
  limit:number = 8;
  totalCount!:number;

  changePage($event:number){
     this.currentPage = $event;
  }

  searchKeyword:string = '';
  // Search Component Related
  catchInputEvent($event:string){
    this.searchKeyword = $event;
    console.log('search keyword:   '+this.searchKeyword);
  }


  @ViewChild('pageTitle') pageTitle!:PageTitleComponent;
  @ViewChild('sectionTitle') sectionTitle!:SectionTitleComponent;

  eventPhotosObservable$!:Observable<any>;

  constructor(private contentService:ContentServiceService) {
  }
  ngOnInit(){
   this.eventPhotosObservable$= this.contentService.fetchEventPhoto();

   // 데이터 뭐가 넘겨졌나 체크용
     this.contentService.fetchEventPhoto().subscribe(
       (data)=>{
         console.log(data);
       }
   );

    this.contentService.fetchEventPhoto().pipe(map((items:any)=>items.length)).subscribe(
      (count)=>{
        this.totalCount = count;
        console.log('total count:', this.totalCount);
      }
    );

  }


  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Event Photos';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Check Our Events & Memories!';
    this.sectionTitle.title.nativeElement.textContent = 'Event Photos';
    this.sectionTitle.subTitle.nativeElement.textContent = 'Check Our Events & Memories!';
  }

  isTotalCountAvailable(){
    return typeof this.totalCount === 'number';
  }
}
