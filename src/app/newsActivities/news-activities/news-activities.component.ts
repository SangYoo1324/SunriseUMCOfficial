import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ExpandingCardComponent} from "../../commonComponents/expanding-card/expanding-card.component";
import {ContentServiceService} from "../../service/content-service.service";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";
import {CalendarComponent} from "../calendar/calendar.component";
import {SermonArchiveComponent} from "../sermon-archive/sermon-archive.component";
import {VariousContentsComponent} from "../various-contents/various-contents.component";

@Component({
  selector: 'app-news-activities',
  standalone: true,
  templateUrl: './news-activities.component.html',
  imports: [
    SectionTitleComponent,
    PageTitleComponent,
    SectionSeparatorComponent,
    CalendarComponent,
    SermonArchiveComponent,
    VariousContentsComponent
  ],
  styleUrls: ['./news-activities.component.css']
})
export class NewsActivitiesComponent {


  @ViewChild('newsActivitiesTitle') pageTitle!: PageTitleComponent;
  @ViewChild('eventCalendarSection') eventCalendarSection!: SectionTitleComponent;
  @ViewChild('serviceArchiveSection') serviceArchiveSection!: SectionTitleComponent;
  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'News & Activities';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Keep up to date with useful information';

    this.eventCalendarSection.title.nativeElement.textContent = 'Event Calendar';
    this.eventCalendarSection.subTitle.nativeElement.textContent= 'Check Our upcoming events!';

    this.serviceArchiveSection.title.nativeElement.textContent = 'Sunday Service';
    this.serviceArchiveSection.subTitle.nativeElement.textContent= 'You can also watch Sunday service uploaded on Youtube';
  }



}
