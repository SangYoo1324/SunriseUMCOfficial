import {Component, ElementRef, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-visit-info',
  templateUrl: './visit-info.component.html',
  styleUrls: ['./visit-info.component.css']
})
export class VisitInfoComponent {

    @ViewChild('sectionTitleComponent') sectionTitleComponent! : SectionTitleComponent;

    @ViewChild('navPoint') navPoint!: ElementRef;
    constructor(private activatedRoute:ActivatedRoute) {

    }

    ngAfterViewInit(){
      this.sectionTitleComponent.title.nativeElement.textContent = "Ways to visit Sunrise UMC!";
      this.sectionTitleComponent.subTitle.nativeElement.textContent = "Ways to visit Sunrise UMC!";
      console.log(this.activatedRoute.snapshot.fragment);

    }
}
