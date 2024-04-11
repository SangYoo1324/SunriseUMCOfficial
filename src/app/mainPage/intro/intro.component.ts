import {Component, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {filter, find, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ScrollServiceService} from "../../service/scroll-service.service";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {

  //Title component 업데이트를 위해 title component 클래스 자체를 가져옴
  @ViewChild('sectionTitleComponent') sectionTitleComponent!: SectionTitleComponent;
  isLoading: boolean =true;

  sermonObservable$!:Observable<any>;
  recentSermon$!:Observable<any>;
  // input으로 carousel 에 들어갈 slide info
  images:any[]= [
    {url: 'assets/VBS_1.jpg'},
    {url: 'assets/VBS_2.jpg'},
    {url: 'assets/VBS_3.jpg'},
    {url: 'assets/VBS_3.jpg'},
    {url: 'assets/VBS_3.jpg'}
  ];

  constructor(private contentService: ContentServiceService,
              private router: Router,
              private scrollService: ScrollServiceService
  ) {
  }
  ngOnInit():void{

   this.contentService.sermonDataStream.subscribe((subj)=>{

     this.recentSermon$ =
     subj.pipe(map((obj:any)=>{
       //배열sort 하고
       this.sortSermon(obj);
       console.log(obj);
       console.log(obj[0]);
       this.isLoading = false;
       return obj[0];
     }))
   });
  }

  sortSermon(items:any){
    items.sort((a:any,b:any)=>new Date(b.date).getTime()-new Date(a.date).getTime());
  }

  ngAfterViewInit(){
    this.sectionTitleComponent.subTitle.nativeElement.textContent = "Hello, Welcome to Sunrise Christ Community Church!";
    this.sectionTitleComponent.title.nativeElement.textContent = "You will find Jesus Here!";
  }

  goTo(target:string, fragment:string){
    this.scrollService.goTo(target, fragment);
  }


}
