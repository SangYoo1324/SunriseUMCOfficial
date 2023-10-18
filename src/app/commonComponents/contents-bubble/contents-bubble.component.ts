import {Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-contents-bubble',
  templateUrl: './contents-bubble.component.html',
  styleUrls: ['./contents-bubble.component.css']
})
export class ContentsBubbleComponent {

  @Input() contentsItems!:any[];

  @ViewChildren('contentCircle') contentTitle!:QueryList<ElementRef>;
  constructor(private renderer: Renderer2,private contentService:ContentServiceService) {
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
    this.toggledContent = i;
    console.log("currently clicked:  "+i);
    this.contentService.numberClickEvent(i);
    // this.renderer.addClass(contentCircle,'bubble-clicked');
  }

}
