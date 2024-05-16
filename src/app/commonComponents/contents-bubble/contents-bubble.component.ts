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
  template: `
    <div class="row">

      <div *ngFor="let contentItem of contentsItems; let i = index" class="col-lg-4 circle-wrap" >
        <div #contentCircle class="round-circle" [style.background]="'url('+contentItem.url+')'"
             [style.background-size]="'cover'"
             (mouseenter)="mouseEnter(contentTitle)"
             (mouseleave)="mouseLeave(contentTitle)"
             (click)="mouseToggle(i, contentTitle)">
          <div #contentTitle  class="overlay"  [ngClass]="{'bubble-clicked': i === toggledContent}" >
            <h5>{{contentItem.title}}</h5>
          </div>
        </div>

      </div>


    </div>

  `,
  styles: [`
    .circle-wrap{
      position: relative;

    }

    .round-circle{
      border-radius: 50%;
      width: 100%;
      height: 300px;
      box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.5);
      margin-top: 1rem;
    }

    .overlay {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 100%;
      height: 300px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      z-index: 1;
      cursor: pointer;
    }

    .bubble-clicked{
      background-color: rgba(0, 0, 0, 0.1);
    }

    .hover{
      color: bisque;
    }



  `]
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
