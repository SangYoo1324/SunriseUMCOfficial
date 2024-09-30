import {Component, OnInit, Renderer2} from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";
import {ScrollServiceService} from "../../service/scroll-service.service";
import {SliderComponent} from "../slider/slider.component";

@Component({
  selector: 'app-contents-bubble-detail',
  standalone: true,
  template: `
    <div class="container" id="contents-bubble-detail">
      <div class="display-outlet">
        <!--    <div *ngFor="let contentItem of contentItems; let i = index" class="content-wrap row"-->
        <!--    [ngStyle]=" {'opacity': toggledIndex === i ? '1' : '0'} " >-->

        <!--    -->

        <!--    </div>-->

        <app-slider></app-slider>


      </div>
    </div>
  `,
  imports: [
    SliderComponent
  ],
  styles: [`
    .display-outlet {
      margin-top: 2rem;
      position: relative;
      border-radius: 2rem;
      box-shadow: 10px 10px 10px rgba(0,0,0,0.9);

      border: 2px solid black;
      height: 350px;
      background: rgba(255, 255, 255, 0.7);
    }

    .content-wrap {
      position: absolute;
      transition: opacity 1s ease-in-out;
    }

    .detail {
      margin-top: 2rem;
    }

    .pic {
      display: flex;
      width: 100%;
      height: 346px;
      border-radius: 1.5rem 0 0 1.5rem;

    }

    .detail {

      width: 100%;
      height: 100%;

    }

    h4 {
      color: #ed4848;
      width: 80%;
      margin: 0 auto;
    }

    p {
      font-size: 1.2rem;
      width: 80%;
      margin: 0 auto;
    }

    .col-lg-7 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 1.5rem;
    }

    @media (max-width: 767px) {
      /*.display-outlet {*/
      /*  height: 750px;*/
      /*}*/

      .col-lg-6 {
        margin-top: 1rem;
      }

      h4 {
        margin-top: 2rem;
      }

      .pic {
        border-radius: 1.5rem 1.5rem 0 0;
      }

    }

  `]
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
