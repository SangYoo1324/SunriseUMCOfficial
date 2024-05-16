import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {map, Observable} from "rxjs";
import {ContentServiceService} from "../service/content-service.service";
import {FormsModule, NgForm} from "@angular/forms";
import {AuthServiceService} from "../routeGuard/auth-service.service";
import {Router} from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DomSanitizer} from "@angular/platform-browser";
import {DataRelatedModule} from "../module/data-related/data-related.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {CommonComponentModuleModule} from "../module/common-component-module.module";
import {EventCalendarControlComponent} from "./event-calendar-control/event-calendar-control.component";
import {EventListComponent} from "./event-list/event-list.component";
import {PostNewsComponent} from "./post-news/post-news.component";
import {NewsListComponent} from "./news-list/news-list.component";

@Component({
  selector: 'app-control-panel',
  standalone: true,
  template:`
    <app-page-title #pageTitleComponent></app-page-title>
    <section class="bg-gray text-white">

      <div class="container">
        <button id="logOut" (click)="logOut()">Log Out</button>

        <h1>Upload Sermon Contents</h1>
        <!--                                    myForm object type을 ngForm으로 명시해줌-->
        <form (ngSubmit)="onSubmit(myForm.value)" #myForm = "ngForm">
          <div class="mb-3">
            <label for="iframe" class="form-label" >Youtube Iframe URL</label>
            <input #iframe="ngModel" required ngModel name="iframe" type="text" class="form-control" id="iframe" aria-describedby="iframeHelp">
            <div id="iframeHelp" class="form-text">ex) - https://www.youtube.com/embed/IF0yphO3ERQ</div>
            <div><small class="text-white" *ngIf="iframe.invalid && iframe.touched">This is required field</small></div>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">title</label>
            <input #title="ngModel" required ngModel name="title" type="text" class="form-control" id="title">
            <div><small *ngIf="title.invalid && title.touched">This is required field</small></div>
          </div>

          <div class="mb-3">
            <label for="date" class="form-label">Date</label>
            <input #date="ngModel" required [(ngModel)]="defaultDate" name="date" type="date" class="form-control" id="date">
            <div><small *ngIf="date.invalid && date.touched">This is required field</small></div>
          </div>

          <div class="mb-3">
            <label for="hyms" class="form-label">Hyms</label>
            <div *ngFor="let input of hymsinputs; let i  = index" class="input-wrap">
              <input required [(ngModel)]="input.value" name="hyms" type="text" class="form-control" id="hyms">
              <button type="button" (click)="addInput()">+</button>
              <button type="button" (click)="removeInput(i)">-</button>
            </div>

          </div>

          <div class="mb-3">
            <label for="scripture" class="form-label">scripture</label>
            <textarea required ngModel name="scripture" class="form-control" id="scripture"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid" >Submit</button>
        </form>
      </div>
    </section>

    <section>
      <div class="container">
        <h1>Sermon Database</h1>
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
                <button class="btn btn-danger delete-btn" (click)="deleteItem(element.id)"> Delete</button></td>
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
      </div>

      <!--  <app-pagination-->
      <!--    [currentPage]="currentPage" [limit]="limit" [total] = "totalNumber"-->
      <!--    (changePage) = changePage($event)-->
      <!--  ></app-pagination>-->
    </section>


    <app-photo-event-control></app-photo-event-control>

    <app-event-calendar-control></app-event-calendar-control>
    <app-event-list></app-event-list>
    <app-post-news></app-post-news>
    <app-news-list></app-news-list>

    <style>
      input.ng-invalid.ng-touched{
        border: red 1px solid;
      }

      small{
        color: red;
      }

      #logOut{
        margin-bottom: 2rem;
      }

      .input-wrap{
        display: flex;
      }
      input{
        width: 80%;
      }

    </style>



  `,
  imports: [
    DataRelatedModule,
    MatPaginatorModule,
    FormsModule,
    CommonComponentModuleModule,
    EventCalendarControlComponent,
    EventListComponent,
    PostNewsComponent,
    NewsListComponent,
    MatTableModule
  ],
  styles:[`

  `]
})
export class ControlPanelComponent {



  constructor(private sanitizer:DomSanitizer, private contentService:ContentServiceService,private authService:AuthServiceService,private router:Router) {

  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(){
    // hyms 1개로 시작
    this.addInput();
    this.fetchSermonsFromComponent();
    console.log(this.defaultDate);
  }

  @ViewChild('pageTitleComponent') pageTitle!:PageTitleComponent;
  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Control Panel';
    this.pageTitle.subTitle1.nativeElement.textContent = 'UnAuthorized access is prohibited';


  }

  //hyms input 개수 추가 관련
  hymsinputs: {id:number |null, value:string }[] = [];

  addInput(){
    this.hymsinputs.push({id: null, value:'' });
    console.log('add hym input');
  }

  removeInput(index:number){
    if(this.hymsinputs.length>1){
      this.hymsinputs.splice(index,1);
      console.log('remove hym input');
    }else{
      alert("need at least 1 hym ")
    }
  }

  deleteItem(id:number){
    this.contentService.deleteSermon(id)
      .subscribe((res)=>{
        console.log(res+ "deleted::::::::::::::::::::");
        // this.fetchSermons();
        alert("successfully deleted");
        this.fetchSermonsFromComponent();
      });
  }

  protected readonly onsubmit = onsubmit;

  items:any[] = [];
  dataSource:any = new MatTableDataSource<any>(this.items);
  displayedColumn:String[] = ['id','title', 'date','delete'];
  //paginator related
  length:number = 0;
  currentPage = 0;

  @ViewChild('myForm') form!:NgForm;
  defaultDate = new Date().toISOString().split('T')[0];
  onSubmit(sermon:{iframe:string,hyms:{id:any |null,value:string}[],date:Date, scripture:string,title:string}){
    console.log(this.hymsinputs);
    sermon.hyms = this.hymsinputs;
    console.log(sermon);
    this.contentService.postSermon(sermon)
      .subscribe((res)=>{
        console.log(res);
        alert("successfully uploaded");
        this.fetchSermonsFromComponent();
      });
  }

  fetchSermonsFromComponent(){
    this.contentService.sermonDataStream

      .subscribe(subj=>{
          console.log(subj);
      subj
        .subscribe((obs:any)=>{
        this.items = obs;
        this.sortPage(this.items);
        this.dataSource.data = this.items;
        this.length = this.items.length;
      })
    });

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
    items.sort((a:any,b:any)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  }

}
