import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../commonComponents/page-title/page-title.component";
import {map, Observable} from "rxjs";
import {ContentServiceService} from "../service/content-service.service";
import {DomSanitizer} from "@angular/platform-browser";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthServiceService} from "../routeGuard/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {

  //pagination related setting
  limit:number=10;
  totalNumber:number= 0;
  currentPage: number = 1;

  changePage(page: number):void{
    this.currentPage = page;
    console.log("current page from parent component::"+this.currentPage);



  }

  // sermon List related Setting
  sermonObservable$!:Observable<any>;

  constructor(private contentService:ContentServiceService,private authService:AuthServiceService,private router:Router) {

  }

  logOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }

  ngOnInit(){
    this.fetchSermonsFromComponent();
    // hyms 1개로 시작
    this.addInput();

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
    // 근본 Object인 service에 있는 오브젝트를  새로고침
    this.sermonObservable$ =   this.contentService.fetchSermons();
    // 이건 새로운 subscription으로 sermonObservable 개수만 새로 assign 해주기 위함
    this.sermonObservable$.pipe(
      map((items)=>items.length)
    ).subscribe( (length)=>{
      this.totalNumber = length;
    })
  }


}
