import {Component, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {find, map, Observable} from "rxjs";
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

  sermonObservable$!:Observable<any>;

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

this.sermonObservable$ =
  this.contentService.fetchSermons().pipe(
    map((sermons)=>sermons.find((sermon:any)=>sermon.id === 1))
  )

  }

  ngAfterViewInit(){
    this.sectionTitleComponent.subTitle.nativeElement.textContent = "Hello All! this is Subtitle";
    this.sectionTitleComponent.title.nativeElement.textContent = "this is Title";
  }

  goTo(target:string){
    this.router.navigate([`/${target}`], {fragment: 'navPoint'})

  }

}
