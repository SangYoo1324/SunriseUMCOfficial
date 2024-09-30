import { Component } from '@angular/core';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule
  ],
  template: `
    <section>
    <div class="container">
      <h1>News List</h1>
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> ID</th>
          <td mat-cell *matCellDef="let element">{{element.id}}</td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef> Title</th>
          <td mat-cell *matCellDef="let element">{{element.title}}</td>
        </ng-container>

        <ng-container matColumnDef="startDate">
          <th mat-header-cell *matHeaderCellDef> StartDate</th>
          <td mat-cell *matCellDef="let element">{{element.startDate.slice(0,10)}}</td>
        </ng-container>

<!--        <ng-container matColumnDef="endDate">-->
<!--          <th mat-header-cell *matHeaderCellDef> EndDate</th>-->
<!--          <td mat-cell *matCellDef="let element">{{element.endDate}}</td>-->
<!--        </ng-container>-->

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
  styles: [``]
})
export class NewsListComponent {
  constructor(private contentService:ContentServiceService) {
  }

  length:number = 0;
  currentPage = 0;
  items:any[]  = [];
  dataSource:any  = new MatTableDataSource(this.items);
  displayedColumn:String[] = ['id','title','startDate','delete'];

  ngOnInit(){
    this.contentService.newsStream.subscribe(subj=>{
      subj.subscribe((obs:any)=>{
        console.log("news-list",obs);
        this.sortPage(obs);
        this.items = obs;
        this.dataSource.data = this.items;
        this.length = this.items.length;

      })
    });

    this.loadPage(10,0);
  }

  deleteEvent(id:number){
    this.contentService.deleteNews(id).subscribe(resp=>{
      alert("Successfully deleted");
      this.contentService.loadNews();
    })
  }

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
    items.sort((a:any, b:any)=>
    new Date(b.startDate).getTime() -new Date(a.startDate).getTime()
    )
  }


}
