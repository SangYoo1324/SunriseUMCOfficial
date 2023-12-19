import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ContentServiceService} from "../../service/content-service.service";
import {MatPaginatorModule} from "@angular/material/paginator";


@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {


  constructor(private contentService:ContentServiceService) {
  }

  ngOnInit(){
    this.contentService.calendarEventStream.subscribe(subj=>{
      subj.subscribe((obs:any)=>{
       this.items = obs;
       this.sortPage(this.items);
       this.dataSource.data = this.items;
       this.length = this.items.length;
      })
    });

    this.loadPage(10,0);
  }

  items:any[] = [];

  dataSource:any = new MatTableDataSource<any>(this.items);
  displayedColumn:String[] = ['id','title', 'date','delete'];



  deleteEvent(id:number){
    this.contentService.deleteEvent(id).subscribe((resp:any)=>{
      alert("Successfully deleted");
      this.contentService.loadCalendarEvent();
    });
  }

  //paginator related
  length:number = 0;
  currentPage = 0;

  handlePageEvent(event:any){
    console.log(event.pageIndex);
    this.currentPage = event.pageIndex;
    this.loadPage(event.pageSize,event.pageIndex);
  }

  loadPage(pageSize:number, pageIdx:number){
    const startIdx = pageIdx*pageSize;
    const endIdx  = startIdx+ pageSize;
    const slicedData = this.items.slice(startIdx,endIdx);
    this.dataSource.data = slicedData;
  }

  sortPage(items:any){
    items.sort((a:any,b:any)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  }

}

