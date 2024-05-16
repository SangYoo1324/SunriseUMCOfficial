import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {JumbotronComponent} from "./mainPage/jumbotron/jumbotron.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { VisitorsInfoComponent } from './visitorsInfo/visitors-info/visitors-info.component';
import { ChildrenYouthComponent } from './childrenYouth/children-youth/children-youth.component';
import { MinistriesComponent } from './ministries/ministries/ministries.component';
import { IntroComponent } from './mainPage/intro/intro.component';
import { VisitInfoComponent } from './visitorsInfo/visit-info/visit-info.component';

import { ChildrenYouthIntroComponent } from './childrenYouth/children-youth-intro/children-youth-intro.component';
import { YouthContentsComponent } from './childrenYouth/youth-contents/youth-contents.component';
import { RightIntroSectionComponent } from './commonComponents/right-intro-section/right-intro-section.component';
import { ContentsBubbleComponent } from './commonComponents/contents-bubble/contents-bubble.component';
import { ContentsBubbleDetailComponent } from './commonComponents/contents-bubble-detail/contents-bubble-detail.component';
import { PageNotFoundComponent } from './commonComponents/page-not-found/page-not-found.component';
import { ExpandingCardComponent } from './commonComponents/expanding-card/expanding-card.component';

import {FormsModule} from "@angular/forms";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "./routeGuard/admin.guard";
import {ContentServiceService} from "./service/content-service.service";
import { LoginComponent } from './login/login.component';

import {SectionSeparatorComponent} from "./commonComponents/section-separator/section-separator.component";
import {CommonComponentModuleModule} from "./module/common-component-module.module";
import {DataRelatedModule} from "./module/data-related/data-related.module";
import {PageTitleComponent} from "./commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "./commonComponents/section-title/section-title.component";
import {LoadingMarkComponent} from "./commonComponents/loading-mark/loading-mark.component";
import {RecentEventsComponent} from "./mainPage/recent-events/recent-events.component";
import {ContactComponent} from "./visitorsInfo/contact/contact.component";
import {SliderComponent} from "./commonComponents/slider/slider.component";




@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    JumbotronComponent,
    VisitorsInfoComponent,
    ChildrenYouthComponent,
    MinistriesComponent,
    IntroComponent,
    // SectionTitleComponent,
    // CarouselComponent,
    // PageTitleComponent,
    VisitInfoComponent,
    ChildrenYouthIntroComponent,
    YouthContentsComponent,
    RightIntroSectionComponent,
    ContentsBubbleDetailComponent,
    PageNotFoundComponent,
    ExpandingCardComponent,

    // FooterComponent,
    // DonationComponent,
    LoginComponent,


  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        // FullCalendarModule,
        // PaginationModule,
        FormsModule,
        HttpClientModule,
        // MatPaginatorModule,
        // MatTableModule,
        // MatDialogModule,
        SectionSeparatorComponent,
        ContentsBubbleComponent,

        CommonComponentModuleModule,
        DataRelatedModule,
        LoadingMarkComponent,
        RecentEventsComponent,
        ContactComponent,
        SliderComponent
    ],
  providers: [AdminGuard, ContentServiceService],
    exports: [
        JumbotronComponent,
        // ContentsBubbleComponent,
        // PageTitleComponent,
        // SectionTitleComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
