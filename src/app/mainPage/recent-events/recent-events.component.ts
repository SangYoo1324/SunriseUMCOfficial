import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {CommonComponentModuleModule} from "../../module/common-component-module.module";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

import {NgClass, NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-recent-events',
  standalone: true,
  imports: [
    CommonComponentModuleModule,
    NgStyle,
    NgForOf,
    NgClass
  ],
  templateUrl: './recent-events.component.html',
  styleUrl: './recent-events.component.css'
})
export class RecentEventsComponent {

  @Input() images:any[]=  [
    {url: "/assets/bible_study.jpg", title: "Adult Bible School", date: '01-17-2024',
      end: '05-18-2024',
      info: "          Come Join us as we dig deeper into God's Word in our Adult Bible Study class. We meet at our church, Sunrise Christ Community Church,\n" +
        "                    weekly on Saturday, at 2:30 pm-4pm.\n" +
        "                    Our current series on the book of Genesis will run until May 18. We're using the book \"Life Lessons from Genesis\" by Max Lucado as our guide.\n" +
        "                    For more info, contact Pastor Jim Mozley at pastorjim@sunrisechristcc.org"},
  ];


  three_recent_event = this.images.sort((a:any, b:any)=>
    new Date(b.date).getTime()-new Date(a.date).getTime()
  ).slice(0,3);

  @ViewChild('sectionTitleComponent') sectionTitleComponent!:SectionTitleComponent;
  @ViewChild('slideTrack') slideTrack!:ElementRef;

  selectedIndex= 0;
  constructor(private renderer:Renderer2) {
  }
  ngAfterViewInit(){
    this.sectionTitleComponent.subTitle.nativeElement.textContent = "Check Our upcoming event!";
    this.sectionTitleComponent.title.nativeElement.textContent = "Recent news";

    this.autoSlideImages();
  }

  autoSlideImages(){
    console.log(this.selectedIndex);
    setInterval(()=>{
      if(this.selectedIndex === this.three_recent_event.length-1){
        this.selectedIndex = 0 ;
      }else{
        this.selectedIndex++;
      }

      console.log(this.selectedIndex);
      //left slide
      if(this.selectedIndex <= this.three_recent_event.length-1){
        this.renderer.setStyle(this.slideTrack.nativeElement, 'transform', 'translateX(-'+(33*this.selectedIndex)+'%');
      }else{
        this.renderer.setStyle(this.slideTrack.nativeElement, 'transform', 'translateX(0%)');
      }
    }, 5000);
  }

  cardClick(e:Event){

  }

}
