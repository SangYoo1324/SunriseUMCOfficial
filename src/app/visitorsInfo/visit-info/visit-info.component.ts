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
      setTimeout(()=>{
        this.sectionTitleComponent.title.nativeElement.textContent = "Things to know about Sunrise Christ CC & ways to come visit us\"";
        // this.sectionTitleComponent.subTitle.nativeElement.textContent = ";
        console.log(this.activatedRoute.snapshot.fragment);
      });

    }
}
