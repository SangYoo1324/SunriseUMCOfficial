import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VisitorsInfoComponent} from "./visitorsInfo/visitors-info/visitors-info.component";
import {JumbotronComponent} from "./mainPage/jumbotron/jumbotron.component";
import {ChildrenYouthComponent} from "./childrenYouth/children-youth/children-youth.component";
import {MinistriesComponent} from "./ministries/ministries/ministries.component";
import {NewsActivitiesComponent} from "./newsActivities/news-activities/news-activities.component";
import {PageNotFoundComponent} from "./commonComponents/page-not-found/page-not-found.component";
import {SermonDetailComponent} from "./newsActivities/sermon-detail/sermon-detail.component";
import {VisitInfoComponent} from "./visitorsInfo/visit-info/visit-info.component";
import {EventPhotosComponent} from "./event-photos/event-photos.component";
import {PhotoDetailComponent} from "./event-photos/photo-detail/photo-detail.component";
import {ControlPanelComponent} from "./control-panel/control-panel.component";
import {AdminGuard} from "./routeGuard/admin.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: '',component: JumbotronComponent ,},
  {path: 'visitorsInfo', component: VisitorsInfoComponent},
  {path: 'childrenYouth', component: ChildrenYouthComponent},
  {path: 'ministries', component: MinistriesComponent},
  {path: 'newsActivities', component: NewsActivitiesComponent},
  {path: 'newsActivities/sermonDetail/:id', component: SermonDetailComponent},

  {path: 'eventPhotos', component: EventPhotosComponent},
  {path: 'eventPhotos/photoDetail/:id', component: PhotoDetailComponent},
  {path: 'controlPanel', component: ControlPanelComponent, canActivate:[AdminGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'donation', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule) },
  {path: '**', component: PageNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
