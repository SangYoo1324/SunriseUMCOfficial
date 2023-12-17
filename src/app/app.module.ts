import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {JumbotronComponent} from "./mainPage/jumbotron/jumbotron.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { VisitorsInfoComponent } from './visitorsInfo/visitors-info/visitors-info.component';
import { ChildrenYouthComponent } from './childrenYouth/children-youth/children-youth.component';
import { MinistriesComponent } from './ministries/ministries/ministries.component';
import { NewsActivitiesComponent } from './newsActivities/news-activities/news-activities.component';
import { IntroComponent } from './mainPage/intro/intro.component';
import { SectionTitleComponent } from './commonComponents/section-title/section-title.component';
import { CarouselComponent } from './commonComponents/carousel/carousel.component';
import { PageTitleComponent } from './commonComponents/page-title/page-title.component';
import { VisitInfoComponent } from './visitorsInfo/visit-info/visit-info.component';
import { ContactComponent } from './visitorsInfo/contact/contact.component';
import { ChildrenYouthIntroComponent } from './childrenYouth/children-youth-intro/children-youth-intro.component';
import { YouthContentsComponent } from './childrenYouth/youth-contents/youth-contents.component';
import { RightIntroSectionComponent } from './commonComponents/right-intro-section/right-intro-section.component';
import { ContentsBubbleComponent } from './commonComponents/contents-bubble/contents-bubble.component';
import { ContentsBubbleDetailComponent } from './commonComponents/contents-bubble-detail/contents-bubble-detail.component';
import { PageNotFoundComponent } from './commonComponents/page-not-found/page-not-found.component';
import { ExpandingCardComponent } from './commonComponents/expanding-card/expanding-card.component';
import { CalendarComponent } from './newsActivities/calendar/calendar.component';

import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from "@fullcalendar/daygrid";
import { SermonArchiveComponent } from './newsActivities/sermon-archive/sermon-archive.component';
import { SermonDetailComponent } from './newsActivities/sermon-detail/sermon-detail.component';
import {PaginationModule} from "./module/pagination/pagination.module";
import { FooterComponent } from './footer/footer.component';
import { DonationComponent } from './donation/donation.component';
import { EventPhotosComponent } from './event-photos/event-photos.component';
import { SearchComponent } from './commonComponents/search/search.component';
import { PhotoListComponent } from './event-photos/photo-list/photo-list.component';
import { PhotoDetailComponent } from './event-photos/photo-detail/photo-detail.component';
import {FormsModule} from "@angular/forms";
import { ControlPanelComponent } from './control-panel/control-panel.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "./routeGuard/admin.guard";
import {ContentServiceService} from "./service/content-service.service";
import { LoginComponent } from './login/login.component';
import { PhotoEventControlComponent } from './control-panel/photo-event-control/photo-event-control.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {EventCalendarControlComponent} from "./control-panel/event-calendar-control/event-calendar-control.component";
import {EventListComponent} from "./control-panel/event-list/event-list.component";
import {SectionSeparatorComponent} from "./commonComponents/section-separator/section-separator.component";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JumbotronComponent,
    VisitorsInfoComponent,
    ChildrenYouthComponent,
    MinistriesComponent,
    NewsActivitiesComponent,
    IntroComponent,
    SectionTitleComponent,
    CarouselComponent,
    PageTitleComponent,
    VisitInfoComponent,
    ContactComponent,
    ChildrenYouthIntroComponent,
    YouthContentsComponent,
    RightIntroSectionComponent,
    ContentsBubbleComponent,
    ContentsBubbleDetailComponent,
    PageNotFoundComponent,
    ExpandingCardComponent,
    CalendarComponent,
    SermonArchiveComponent,
    SermonDetailComponent,
    FooterComponent,
    DonationComponent,
    EventPhotosComponent,
    SearchComponent,
    PhotoListComponent,
    PhotoDetailComponent,
    ControlPanelComponent,
    LoginComponent,
    PhotoEventControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    PaginationModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    EventCalendarControlComponent,
    EventListComponent,
    SectionSeparatorComponent
  ],
  providers: [AdminGuard, ContentServiceService],
  exports: [
    PageTitleComponent,
    SectionTitleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
