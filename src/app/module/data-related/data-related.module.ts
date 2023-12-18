import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {NewsActivitiesComponent} from "../../newsActivities/news-activities/news-activities.component";
import {CalendarComponent} from "../../newsActivities/calendar/calendar.component";
import {SermonArchiveComponent} from "../../newsActivities/sermon-archive/sermon-archive.component";
import {SermonDetailComponent} from "../../newsActivities/sermon-detail/sermon-detail.component";
import {PhotoEventControlComponent} from "../../control-panel/photo-event-control/photo-event-control.component";
import {EventPhotosComponent} from "../../event-photos/event-photos.component";
import {SearchComponent} from "../../commonComponents/search/search.component";
import {PhotoListComponent} from "../../event-photos/photo-list/photo-list.component";
import {PhotoDetailComponent} from "../../event-photos/photo-detail/photo-detail.component";
import {ControlPanelComponent} from "../../control-panel/control-panel.component";
import {AdminGuard} from "../../routeGuard/admin.guard";
import {ContentServiceService} from "../../service/content-service.service";
import {CommonComponentModuleModule} from "../common-component-module.module";
import {
  EventCalendarControlComponent
} from "../../control-panel/event-calendar-control/event-calendar-control.component";
import {EventListComponent} from "../../control-panel/event-list/event-list.component";
import {FullCalendarModule} from "@fullcalendar/angular";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";



@NgModule({
  declarations: [
    //data related Components
    NewsActivitiesComponent,
    CalendarComponent,
    SermonArchiveComponent,
    SermonDetailComponent,
    PhotoEventControlComponent,
    EventPhotosComponent,
    SearchComponent,
    PhotoListComponent,
    PhotoDetailComponent,
    ControlPanelComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    CommonComponentModuleModule,
    EventCalendarControlComponent,
    EventListComponent,
    FullCalendarModule,
    SectionSeparatorComponent

  ],
  providers: [AdminGuard, ContentServiceService],
})
export class DataRelatedModule { }
