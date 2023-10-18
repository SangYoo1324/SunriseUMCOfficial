import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {repeat} from "rxjs";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-youth-contents',
  templateUrl: './youth-contents.component.html',
  styleUrls: ['./youth-contents.component.css']
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
    this.sectionTitle.subTitle.nativeElement.textContent = 'More Details';
  }

  protected readonly repeat = repeat;
}
