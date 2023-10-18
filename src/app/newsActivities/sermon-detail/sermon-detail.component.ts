import {ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ContentServiceService} from "../../service/content-service.service";
import {async, count, filter, map, Observable, pluck, tap} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-sermon-detail',
  templateUrl: './sermon-detail.component.html',
  styleUrls: ['./sermon-detail.component.css']
})
export class SermonDetailComponent {
  @ViewChild('newsActivitiesTitle') pageTitle!: PageTitleComponent;
  @ViewChild('iframeSlot', {read: ElementRef}) iframeSlot!: ElementRef;
  startIndex:number = 1;
  endIndex!:number;

  sermonIndexFromRouter!:number;

  sermonObject!: {
    id: number;
    iframe: string;
    title: string;
    hym: string[];
    scripture: string;
  };

  sermonObservable$!:Observable<any>;
  targetedSermonObservable$!: Observable<any>;
  url!:SafeResourceUrl;


  constructor(private router:Router,private contentService: ContentServiceService,
              private activatedRoute: ActivatedRoute,
              private changeDetectorRef:ChangeDetectorRef,
              private sanitizer:DomSanitizer,
              private renderer: Renderer2) {

  }
  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'News & Activities';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Keep up to date with useful information';


  }

  ngOnInit(){
    // 일단 sermon 객체를 service에서 가져옴
    this.sermonObservable$ =
       this.contentService.fetchSermons();


    this.contentService.fetchSermons().subscribe((datas)=>{
      datas.forEach((data:any)=>{
        console.log(data.hym);
      })
    });

    // get the total amount of sermons
    this.contentService.fetchSermons().pipe( map((items)=>items.length)).subscribe((count)=>{
      this.endIndex = count;
      console.log('total count:',this.endIndex);
    });

    this.activatedRoute.paramMap.subscribe((param)=>{

        this.sermonIndexFromRouter = parseInt(param.get('id')!,10);    // index 추출
        console.log('sermonIndex: '+this.sermonIndexFromRouter);

      // 해당 sermon 객체를 sermonService에서 찾음
     this.targetedSermonObservable$ =  this.sermonObservable$
       .pipe(
          map((sermons)=>sermons.find((sermon:any)=>sermon.id === this.sermonIndexFromRouter)),
         filter((sermon)=>sermon !== undefined)
        )




    });



  }

  appendIframe(src: string){
    const iframeElement = this.renderer.createElement('iframe');
    this.renderer.setAttribute(iframeElement, 'width', '100%');
    this.renderer.setAttribute(iframeElement, 'height', '480');
    this.renderer.setAttribute(iframeElement, 'src', '' );
    this.renderer.setAttribute(iframeElement, 'title', 'What is Child Routes in Angular | Angular Routing | Angular 13+');
    this.renderer.setAttribute(iframeElement, 'frameborder', '0');
    this.renderer.setAttribute(iframeElement, 'allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    this.renderer.setAttribute(iframeElement, 'allowfullscreen', '');
    console.log(iframeElement.nativeElement);
    this.renderer.appendChild(this.iframeSlot.nativeElement, iframeElement);
  }


}
