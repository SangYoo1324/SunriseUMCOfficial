import { Component } from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {filter, map, Observable, of} from "rxjs";
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {PaginatorService} from "../../service/paginator.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sermon-archive',
  templateUrl: './sermon-archive.component.html',
  styleUrls: ['./sermon-archive.component.css'],
  providers:[{provide:MatPaginatorIntl, useClass:PaginatorService}]
})
export class SermonArchiveComponent {

  //pagination related setting
  length:number = 0;

  isLoading:boolean = true;

  sermonObservable$!:Observable<any>;
   url!:SafeResourceUrl;
  constructor(private router:Router, private contentService:ContentServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(){

    this.contentService.sermonDataStream.subscribe((subj)=>{
      subj.subscribe((obs:any)=>{
        console.log("sermonDataStream "+obs.length);
        this.length = obs.length;
        this.items = obs;
        this.sortSermon(this.items);
      this.datasource.data = this.items;
      this.isLoading= false;
      });
    });

    this.loadPage(10,0);
  }

  changePage(page: number):void{
    this.currentPage = page;
    console.log("current page from parent component::"+this.currentPage);



  }

  items:any[] = [

  ];

  datasource:any= new MatTableDataSource<any>(this.items);




  displayedColumns:String[]= ['id','title','date','view'];
  currentPage: number = 0;
  handlePageEvent(e:PageEvent){
  console.log(e.pageIndex);
  this.currentPage = e.pageIndex;
    this.loadPage(e.pageSize,e.pageIndex);
  }

  loadPage(pageSize:number, pageIdx:number){
    const startIdx = pageIdx*pageSize;
    const endIdx = startIdx +pageSize;
    const slicedData = this.items.slice(startIdx,endIdx);

    this.datasource.data = slicedData;
  }

  moveToSermon(page:number){
    this.router.navigate(['newsActivities/sermonDetail/'+page]);
  }

  sortSermon(items:any){
    items.sort((a:any,b:any)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  }
}
