import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {map, Observable} from "rxjs";
import {ContentServiceService} from "../service/content-service.service";
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "../routeGuard/auth-service.service";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
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
