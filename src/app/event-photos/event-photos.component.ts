import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../service/content-service.service";
import {map, Observable} from "rxjs";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {SearchComponent} from "../commonComponents/search/search.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-event-photos',
  standalone: true,
  template: `
    <app-page-title #pageTitle></app-page-title>

    <section>
      <div class="container">
        <app-section-title #sectionTitle></app-section-title>
      </div>
      <app-search
        (inputEvent)="catchInputEvent($event)"
        (refreshEvent)="resetSearchResult($event)"
      ></app-search>
      <div class="container">

        <div class="row">

          <div class="col-lg-3 item"
               *ngFor="let event of (displayedItems) let i=index" routerLink="/eventPhotos/photoDetail/{{event.id}}">
            <div class="card">
              <img [src]="event.s3_urls[0]" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">{{event.title}} &nbsp;</h5>
                <p class="card-text">{{event.subTitle}}</p>
                <!--            <p class="card-text"><small class="text-body-secondary">from {{event.date | date:'yyyy-mm-dd'}}</small></p>-->
              </div>
            </div>
          </div>


        </div>

        <mat-paginator
          [length]="length"
          [pageSize]="5"
          [showFirstLastButtons]=true
          [pageSizeOptions]="[5,10,20]"
          [pageIndex]="currentPage"
          (page)="handlePageEvent($event)"
        ></mat-paginator>
      </div>
    </section>

    <style>

      .card {
        box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.5);
      }

      .item {
        margin-bottom: 2rem;
        /*display: none;*/
      }

      .card {
      !important width: 25 rem;
      }

      /*.pagination-active{*/
      /*  display: block;*/
      /*}*/
      /*.search-active{*/
      /*  display: block;*/
      /*}*/

      img {
        min-height: 250px;
        max-height: 250px;
      }

      .item {
        cursor: pointer;
      }

    </style>

  `,
  imports: [
    SearchComponent,
    MatPaginatorModule,
    PageTitleComponent,
    SectionTitleComponent,
    NgForOf,
    RouterLink
  ],
  styles: [`

  `]
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
