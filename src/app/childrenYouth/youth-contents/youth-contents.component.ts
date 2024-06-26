import {Component, ViewChild} from '@angular/core';

import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {repeat} from "rxjs";
import {ContentServiceService} from "../../service/content-service.service";

import {ContentsBubbleComponent} from "../../commonComponents/contents-bubble/contents-bubble.component";
import {AppModule} from "../../app.module";
import {
  ContentsBubbleDetailComponent
} from "../../commonComponents/contents-bubble-detail/contents-bubble-detail.component";

@Component({
  selector: 'app-youth-contents',
  standalone: true,
  template: `
    <section class="section-bg-dark">
      <div class="container">
        <app-section-title #sectionTitleComponent></app-section-title>

        <div class="contents-wrap">
          <app-contents-bubble
            [contentsItems]="contentItems"></app-contents-bubble>
        </div>
      </div>

      <app-contents-bubble-detail></app-contents-bubble-detail>
    </section>


  `,
  imports: [
    ContentsBubbleComponent,
    SectionTitleComponent,
    ContentsBubbleDetailComponent,
  ],
  styles: [`

  `]
})
export class YouthContentsComponent {
  // section Title control variable
  @ViewChild('sectionTitleComponent') sectionTitle!: SectionTitleComponent;

  contentItems:any[]= [];  // contentArray (import from contentService)

  constructor(private contentService: ContentServiceService) {
  }


  ngOnInit(){
   // this.contentItems=  this.contentService.contentItems;
   this.contentService.childrenYouthObservable.subscribe((item)=>{
     console.log(item);
     this.contentItems.push(item);
     console.log("observable값이 push 됬는지 확인용"+this.contentItems);
    });
  }
  ngAfterViewInit(){
    // section Title control
    this.sectionTitle.title.nativeElement.textContent = 'Youth Contents';
    this.sectionTitle.subTitle.nativeElement.textContent = 'Check Our Youth Contents!';
  }

  protected readonly repeat = repeat;
}
