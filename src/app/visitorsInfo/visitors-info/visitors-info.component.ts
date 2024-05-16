import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ScrollServiceService} from "../../service/scroll-service.service";
import {VisitInfoComponent} from "../visit-info/visit-info.component";
import {ActivatedRoute} from "@angular/router";
import {SectionSeparatorComponent} from "../../commonComponents/section-separator/section-separator.component";
import {ContactComponent} from "../contact/contact.component";

@Component({
  selector: 'app-visitors-info',
  standalone: true,
  templateUrl: './visitors-info.component.html',
  imports: [
    SectionSeparatorComponent,
    ContactComponent,
    VisitInfoComponent,
    PageTitleComponent
  ],
  styleUrls: ['./visitors-info.component.css']
})
export class VisitorsInfoComponent implements AfterViewInit{
  // section Title control
  @ViewChild('visitorInfoTitle') visitorInfoTitle!: PageTitleComponent;
  @ViewChild('visitInfo') visitInfoComponent!: VisitInfoComponent;
  constructor(private scrollService:ScrollServiceService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(){

  }

  // child view가 초기화 된 후에 발동하게 함
  ngAfterViewInit(){
    this.visitorInfoTitle.title1.nativeElement.textContent = 'Visitors Info';
    this.visitorInfoTitle.subTitle1.nativeElement.textContent = 'Always welcome to visit';

    // scroll into fragment
    if(this.activatedRoute.snapshot.fragment){
      setTimeout(()=>{
        document.getElementById(this.activatedRoute.snapshot.fragment!)?.scrollIntoView({behavior:'smooth'});
      },100);
    }





  }


}
