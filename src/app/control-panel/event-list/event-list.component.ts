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
  template:`
    <section>

      <div class="container">
        <h1>Event Calendar</h1>
        <table mat-table [dataSource]="dataSource">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef> ID</th>
            <td mat-cell *matCellDef="let element">{{element.id}}</td>
          </ng-container>

          <ng-container matColumnDef="title">
            <th mat-header-cell *matHeaderCellDef> Title</th>
            <td mat-cell *matCellDef="let element">{{element.title}}</td>
          </ng-container>

          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef> Date</th>
            <td mat-cell *matCellDef="let element">{{element.date}}</td>
          </ng-container>

          <ng-container matColumnDef="time">
            <th mat-header-cell *matHeaderCellDef> Time</th>
            <td mat-cell *matCellDef="let element">{{element.time}}</td>
          </ng-container>

          <ng-container matColumnDef="delete">
            <th mat-header-cell *matHeaderCellDef> Delete</th>
            <td mat-cell *matCellDef="let element">
              <button class="btn btn-danger delete-btn" (click)="deleteEvent(element.id)"> Delete</button></td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumn"></tr>
          <tr mat-row *matRowDef = "let row; columns: displayedColumn"></tr>
        </table>

        <mat-paginator
          [length] = "length"
          [pageSize]="10"
          [showFirstLastButtons] = true
          [pageSizeOptions]="[5,10,20]"
          [pageIndex]="currentPage"
          (page) ="handlePageEvent($event)"
        >
        </mat-paginator>

      </div>

    </section>

    <style>
      .delete-btn{
        font-size: 0.7rem;
      }
    </style>

  `,
  styles:[`

  `]
})
export class EventListComponent {


  constructor(private contentService:ContentServiceService) {
  }

  ngOnInit(){
    this.contentService.calendarEventStream.subscribe(subj=>{
      subj.subscribe((obs:any)=>{
       this.sortPage(obs);
        this.items = obs;
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

