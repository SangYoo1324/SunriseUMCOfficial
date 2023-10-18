import {Component, HostListener, ViewChild} from '@angular/core';
import {animate, query, style, transition, trigger} from "@angular/animations";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {fader, slider} from "./route-animations";
import {HeaderComponent} from "./header/header.component";
import dayGridPlugin from "@fullcalendar/daygrid";
import {CalendarOptions} from "@fullcalendar/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    //fader
    slider
  ]
})
export class AppComponent {
  title = 'sunriseUMC';

  constructor(private router: Router) {

  }


  ngOnInit(){

    // router 이벤트일 때마다 맨 위로 스크롤
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // 맨 위로 스크롤
      }
    });
  }

 prepareRoute(outlet: RouterOutlet){
   return outlet.activatedRouteData['animation'];
 }


 @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

 @HostListener('document:click',['$event'])
  onDocumentClick(event: MouseEvent){
    this.headerComponent.handleCustomEvent();
 }
}
