import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../service/content-service.service";
import {map, Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-event-photos',
  templateUrl: './event-photos.component.html',
  styleUrls: ['./event-photos.component.css']
})
export class EventPhotosComponent {

  searchMode!:boolean;

  //pagination related Variables
  // currentPage:number= 1;
  // limit:number = 8;
  // totalCount!:number;

  // changePage($event:number){
  //    this.currentPage = $event;
  // }



  @ViewChild('pageTitle') pageTitle!:PageTitleComponent;
  @ViewChild('sectionTitle') sectionTitle!:SectionTitleComponent;

  eventPhotosObservable$!:Observable<any>;

  constructor(private contentService:ContentServiceService) {
  }
  ngOnInit(){
    // setTimeout(
      // ()=>{
        this.contentService.eventPhotoStream.subscribe((subj)=>{
          subj.subscribe((obs:any)=>{
            console.log(obs);
            this.length = obs.length;
            this.items = obs;
            this.storedItems =obs;
            this.loadPage(5,0);
          })
        });
      // }

    // );

  }


  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Event Photos';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Check Our Events & Memories!';
    this.sectionTitle.title.nativeElement.textContent = 'Event Photos';
    this.sectionTitle.subTitle.nativeElement.textContent = 'Check Our Events & Memories!';

  }

  length!:number
  currentPage= 0;

  // items$!:Observable<any>;
  storedItems!:any[];

  items!:any[];
  displayedItems!:any[];

  // 따로 만드는 이유
  // 10개가 있고 페이지당 5개라고 치자
  // items를 변경시키는 경우
  // 2페이지로 가면 items = 5개가 되는데 이렇게하면 idex 5~9는 비고 0~4a만 원래 5~9였던게 들어감
  // 원래 기본 데이터를 잃어버렸기 때문에

  handlePageEvent(e:PageEvent){
    console.log(e.pageIndex);
    this.currentPage = e.pageIndex;
    this.loadPage(e.pageSize,e.pageIndex);
  }

  loadPage(pageSize:number, pageIdx:number){
    const startIdx = pageIdx*pageSize;
    const endIdx = startIdx +pageSize;
    const slicedData = this.items.slice(startIdx,endIdx);
    console.log(startIdx+  " + " +endIdx);
    this.displayedItems = slicedData;
    console.log(this.displayedItems);
  }

  // searchKeyword:string = '';
  // Search Component Related
  catchInputEvent($event:string){

    console.log('search keyword:   '+$event);
    this.loadSearchedPage($event);
  }

  loadSearchedPage(keyword:string){
    this.items = this.items.filter((e)=>e.title.toLowerCase().includes(keyword));
    console.log(this.items);
    this.loadPage(5,0);
  }

  resetSearchResult(event:any){
    console.log("reset");
    this.items = this.storedItems;
    this.loadPage(5,0);
  }

}
