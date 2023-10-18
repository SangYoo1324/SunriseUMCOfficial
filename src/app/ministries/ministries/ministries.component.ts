import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {ExpandingCardComponent} from "../../commonComponents/expanding-card/expanding-card.component";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

@Component({
  selector: 'app-ministries',
  templateUrl: './ministries.component.html',
  styleUrls: ['./ministries.component.css']
})
export class MinistriesComponent {

  @ViewChild('ministryTitle') pageTitle!: PageTitleComponent;
  @ViewChild('sectionTitle') sectionTitle!: SectionTitleComponent;
  @ViewChild('expandingCardComponent') cardComponent!: ExpandingCardComponent;

  // will be exported to childcomponentt expandingCard with @input()
  contentItems:any[]= [];  // contentArray (import from contentService)

  constructor(private contentService:ContentServiceService) {
  }
  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Ministries';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Ongoing Ministries with dedication';

    this.sectionTitle.subTitle.nativeElement.textContent = 'Ways to help others';
    this.sectionTitle.title.nativeElement.textContent = 'We can help!';
  }

  ngOnInit() {
    this.contentService.ministryObservable.subscribe(
      (item) => {
        console.log(item);
        this.contentItems.push(item);
        console.log("observable값이 push 됬는지 확인용" + this.contentItems);

      });
  }
}
