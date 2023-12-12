import {Component, OnInit, Renderer2} from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";
import {ScrollServiceService} from "../../service/scroll-service.service";

@Component({
  selector: 'app-contents-bubble-detail',
  templateUrl: './contents-bubble-detail.component.html',
  styleUrls: ['./contents-bubble-detail.component.css']
})
export class ContentsBubbleDetailComponent implements OnInit{

  contentItems!:any[];  // contentArray (import from contentService)

  constructor(private scrollService:ScrollServiceService,private renderer:Renderer2, private contentService: ContentServiceService) {
  }

  toggledIndex:number = 0;
  ngOnInit(){



    this.contentItems=  this.contentService.contentItems;
  }

  ngAfterViewInit(){
    // setTimeout(()=>{
      this.contentService.currentCircleContentNumber.subscribe((i)=>{
        this.toggledIndex = i;
        console.log("now toggled:  "+i);
      });
    // },100);

    this.scrollService.getSectionId().subscribe((id)=>{
      const section = document.getElementById(id);
      if(section){
        section.scrollIntoView({behavior:'smooth', block: 'center', inline: 'end'});
      }
    });
  }

  // ngOnDestroy(){
  //   this.contentService.currentCircleContentNumber.unsubscribe();
  // }
}
