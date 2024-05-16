import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {JumbotronComponent} from "./mainPage/jumbotron/jumbotron.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { VisitorsInfoComponent } from './visitorsInfo/visitors-info/visitors-info.component';

import { IntroComponent } from './mainPage/intro/intro.component';
import { VisitInfoComponent } from './visitorsInfo/visit-info/visit-info.component';

import { RightIntroSectionComponent } from './commonComponents/right-intro-section/right-intro-section.component';

import { ContentsBubbleDetailComponent } from './commonComponents/contents-bubble-detail/contents-bubble-detail.component';
import { PageNotFoundComponent } from './commonComponents/page-not-found/page-not-found.component';
import { ExpandingCardComponent } from './commonComponents/expanding-card/expanding-card.component';

import {FormsModule} from "@angular/forms";

import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AdminGuard} from "./routeGuard/admin.guard";
import {ContentServiceService} from "./service/content-service.service";
import { LoginComponent } from './login/login.component';


import {SliderComponent} from "./commonComponents/slider/slider.component";
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";




@NgModule({
  declarations: [
  AppComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    HttpClientModule,
    SliderComponent,
    FooterComponent,
    HeaderComponent,


  ],
  providers: [AdminGuard, ContentServiceService],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
