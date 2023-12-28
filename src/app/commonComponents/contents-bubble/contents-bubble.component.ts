import {Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";
import {ScrollServiceService} from "../../service/scroll-service.service";
import {CommonModule, NgClass} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contents-bubble',
  standalone:true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './contents-bubble.component.html',
  styleUrls: ['./contents-bubble.component.css']
})
export class ContentsBubbleComponent {

  @Input() contentsItems!:any[];
  @Input() routeEnabled:boolean =false;

  contentItems2!:any[];

  @ViewChildren('contentCircle') contentTitle!:QueryList<ElementRef>;
  constructor(private router:Router,private scrollService:ScrollServiceService,private renderer: Renderer2,private contentService:ContentServiceService) {
  }

  ngAfterViewInit(){
    this.contentItems2 = this.contentsItems;
  }

  toggledContent:number  =0;
  mouseEnter(contentCircle:HTMLElement):void{
    this.renderer.addClass(contentCircle,'hover');
    console.log("mouseEnter");
  }

  mouseLeave(contentCircle:HTMLElement):void{
    this.renderer.removeClass(contentCircle,'hover');
    console.log("mouseLeave");
  }

  mouseToggle(i:number, contentCircle:HTMLElement){
    if(this.routeEnabled){
      console.log(this.contentsItems[i].route);
      // fragment가 있을 경우 fragment까지 해서
      if(this.contentsItems[i].fragment){
        this.router.navigate([this.contentsItems[i].route],
          {fragment: this.contentsItems[i].fragment}
        );
      }
      // fragment 가 없을 경우 그냥 routing만
      else{
        this.router.navigate([this.contentsItems[i].route]);
      }

    }else{
      this.toggledContent = i;
      console.log("currently clicked:  "+i);
      this.scrollService.setSectionId('contents-bubble-detail');
      this.contentService.numberClickEvent(i);
    }

  }

}
