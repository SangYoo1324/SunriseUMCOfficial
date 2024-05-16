import {ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContentServiceService} from "../../service/content-service.service";
import {async, count, filter, map, Observable, pluck, tap} from "rxjs";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sermon-detail',
  standalone: true,
  template:`
    <app-page-title #newsActivitiesTitle></app-page-title>

    <section>
      <div class="container">
        <div class="btn-wrap">
          <div class="each_btn_wrap">
            <button *ngIf="targetedSermon?.id !== 1"
                    type="button" class="nav_button btn btn btn-secondary" routerLink="/newsActivities/sermonDetail/{{targetedSermon?.id-1}}">prev</button>
            <div *ngIf="targetedSermon?.id == 1" class="page_indicator nav_button">This is First Page</div>
          </div>

          <div class="each_btn_wrap">
            <button *ngIf="targetedSermon?.id< endIndex"
                    type="button" class="nav_button btn btn-secondary" routerLink="/newsActivities/sermonDetail/{{targetedSermon?.id+1}}">next</button>
            <div *ngIf="targetedSermon?.id === endIndex" class="page_indicator nav_button">This is Last Page</div>
          </div>

        </div>
        <div class="content_wrap">

          <h1>{{targetedSermon?.title}}</h1>

          <div #iframeSlot class="iframeSlot">

            <iframe width="100%" height="480"    [src]="targetedSermon?.iframe" title="Build Angular Pagination Without a Library" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

          </div>

          <div class="row detail">
            <div class="col-lg-5 hym">
              <h3>Hyms</h3>
              <p>
                <li *ngFor="let hym of targetedSermon?.hyms" >
                  {{hym.value}}
                </li>

              </p>
            </div>
            <div class="col-lg-7 scripture">
              <h3>Scripture Readings</h3>
              <p>
                {{targetedSermon?.scripture}}
              </p>
            </div>
          </div>

        </div>

        <a routerLink="/newsActivities">Back to List</a>
      </div>


    </section>


    <style>
      .detail{
        margin-top: 2rem;
        font-size: 1.5rem;
      }

      .nav_button{
        display: block;
        margin: 0 1rem;
      }
      .btn-wrap{

        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        margin-bottom: 2rem;
      }

      a{
        display: block;
        width: 150px;
        margin-top: 2rem;
        margin-left: auto;
      }

      h3{
        color: #ed4848;
      }

      .page_indicator{
        color: cornflowerblue;
      }


      .content_wrap{
        padding: 2rem;
        border: 1px solid black;
        border-radius: 2rem;
      }

      .hym{
        border-right: 1px solid black;
        border-bottom: none;
      }

      .scripture{
        padding-left: 3rem;
      }

      @media (max-width: 1024px) {

        .content_wrap{
          padding: 0;
          border: none;
        }

        iframe{
          height: 350px;
        }

        .hym{
          border-right: none;
          border-bottom: 1px solid black;
          margin-bottom: 1rem;
        }

        .detail{
          font-size: 1rem;
        }

        .scripture{
          padding: 1rem;
        }

      }

    </style>

  `,
  imports: [
    NgIf,
    PageTitleComponent,
    RouterLink
  ],
  styles: [`
  `]
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
  sermon!:any;
  targetedSermonObservable$!: Observable<any>;
  targetedSermon!:any;
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

    this.sermonObservable$.subscribe(resp=>{
      this.sermon = resp;
    })


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

       this.targetedSermonObservable$.subscribe(resp=>{
         this.targetedSermon = resp;
      })




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


  protected readonly async = async;
}
