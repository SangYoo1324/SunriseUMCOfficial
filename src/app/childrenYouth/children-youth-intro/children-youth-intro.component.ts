import {Component, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {RightIntroSectionComponent} from "../../commonComponents/right-intro-section/right-intro-section.component";

@Component({
  selector: 'app-children-youth-intro',
  templateUrl: './children-youth-intro.component.html',
  styleUrls: ['./children-youth-intro.component.css']
})
export class ChildrenYouthIntroComponent {


  @ViewChild('sectionTitleComponent') sectionTitleComponent!:SectionTitleComponent;
  @ViewChild('rightIntroSection') rightIntroSectionComponent!: RightIntroSectionComponent;
  // input으로 carousel 에 들어갈 slide info
  images:any[]= [
    {url: '/assets/VBS_1.jpg'},
    {url: '/assets/VBS_2.jpg'},
    {url: '/assets/VBS_3.jpg'},
    {url: '/assets/VBS_1.jpg'}
    ,{url: '/assets/VBS_2.jpg'}
  ];

  ngAfterViewInit(){
    //section title control
    this.sectionTitleComponent.title.nativeElement.textContent = 'CHILDREN & YOUTH';
    this.sectionTitleComponent.subTitle.nativeElement.textContent = 'Always welcome to ask';

    // right section title control
    this.rightIntroSectionComponent.span = "hello";
    this.rightIntroSectionComponent.title = "noice to meet ya";
  }


}

