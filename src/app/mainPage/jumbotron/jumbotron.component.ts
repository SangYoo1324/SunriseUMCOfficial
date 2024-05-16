import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ScrollServiceService} from "../../service/scroll-service.service";
import {RouterLink} from "@angular/router";
import {IntroComponent} from "../intro/intro.component";
import {RecentEventsComponent} from "../recent-events/recent-events.component";


@Component({
  selector: 'app-jumbotron',
  standalone: true,
  template: `
    <div id="jumbotron" #jumbotron>


      <video [autoplay]="true" [muted]="true" [loop]="true" src="/assets/sample2%20(1).mp4">
      </video>
      <div
        class="jumbotron_text_box">
        <div class="wrap">
          <div class="text-wrap">
            <h2>SUNRISE CHRIST COMMUNITY CHURCH</h2>
            <h5>"Blessings to you all in the Powerful and Loving Name of Jesus"</h5>
          </div>
          <div class="btn_wrap">
            <a class="Btn_link" routerLink="/visitorsInfo">Plan for Visit &nbsp;<b> > </b></a>
            <a class="Btn_link" (click)="goTo('newsActivities','SermonList')">Sunday Worship &nbsp;<b> > </b></a>
          </div>
        </div>

      </div>

      <div class="mouse"><i class=" fa-solid fa-computer-mouse"></i></div>
    </div>

    <app-intro></app-intro>

    <app-recent-events></app-recent-events>

    <style>
      video {
        position: relative;
        width: 100%;
        z-index: 0;
      }
    </style>

  `,
  styles: [`
    /*for snowflake*/
    .snowflake {
      position: absolute;
      top: -8px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
      /*animation: fall 10s linear;*/

    }

    @keyframes fall {
      from {
        transform: translateY(-8px); /* 시작 위치 설정 */
        opacity: 1; /* 시작 투명도 설정 */
      }
      to {
        transform: translateY(100vh);
        opacity: 0;
      }
    }


    #jumbotron {
      margin-top: 65px;
      position: relative;
      width: 100%;
      /*background: white;*/
      /*!*background-image:linear-gradient(to right,rgba(0,0,0,0.6),rgba(0,0,0,0)*!*/
      /*!*), url("/assets/church_background.jpg");*!*/
      /*background-size: cover;*/

    }

    h2 {
      font-weight: bold;
      font-size: 44px;
    }

    p {
      font-size: 20px;
      padding-top: 1rem;
    }

    .wrap {
      position: absolute;
      width: 60%;
      top: 48%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .jumbotron_text_box {
      color: lightgrey;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /*display: flex;*/
      /*align-items: center;*/
      /*width: 50%;*/
      /*height: 40%;*/
      /*top: 45%;*/
      /*left: 50%;*/
      /*transform: translate(-90%,-50%);*/
      /*padding: 1rem 2rem;*/
      /*box-shadow: 0 10px 20px black;*/
      background: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)
      );

      /*color: white;*/
      z-index: 10;

    }

    .jumbotron_text_box > .wrap > p {
      font-size: 1.5rem;
    }


    .mouse {
      display: block;
      color: white;
      font-size: 35px;
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      animation: mouse_ani 1s ease-in-out infinite;
      background: none;
    }

    .btn_wrap {
      margin-top: 1rem;
    }

    .Btn_link {

      text-align: center;
      display: block;
      width: 100%;
      margin-left: 1rem;
      margin-right: 1rem;
      margin-top: 1rem;
      padding: 0.4rem 0.5rem;
      border: 1px solid white;
      text-decoration: none;
      color: inherit;
      transition: background-color 1s ease-in-out,
      color 1s ease-in-out;
      font-size: 14px;
    }

    .Btn_link > a {
      text-decoration: none;
      color: white;
    }

    .Btn_link > a:hover {
      color: #1e2125;
    }

    .Btn_link:hover {
      background-color: aliceblue;
      color: #1e2125;
      cursor: pointer;
    }


    .btn_wrap {
      text-align: center;
      display: flex;
    }


    @keyframes mouse_ani {
      0% {
        bottom: 30px;
      }
      50% {
        bottom: 20px;
      }
      100% {
        bottom: 30px;
      }
    }

    @media (max-width: 767px) {
      h2 {
        font-size: 20px;
        text-align: center;
      }

      h5 {
        text-align: center;
      }

      .p {
        font-size: 13px;
      }

      .wrap {
        width: 100%;
        /*display: flex;*/
      }

      .mouse {
        display: none;
      }

      .btn_wrap {

        /*margin-top: 2rem;*/
      }

      p {
        font-size: 15px;

      }


    }



  `],
  imports: [
    RouterLink,
    IntroComponent,
    RecentEventsComponent
  ],
  animations: [
    trigger('animate_transparency', [
      state('false', style({opacity: 0, visibility: 'hidden'})),
      state('true', style({opacity: 1, visibility: 'visible'})),
      transition('false=>true', animate('500ms ease-in')),
      transition('true=>false', animate('500ms ease-out'))
    ])
  ]
})
export class JumbotronComponent {

  @ViewChild('jumbotron') jumbotron!:ElementRef;
  constructor(private renderer:Renderer2, private scrollService:ScrollServiceService) {
  }

  @ViewChild('video') video!:ElementRef;


  goTo(target:string, fragment:string){
    this.scrollService.goTo(target, fragment);
  }



  // snowFlake related
  MIN_DURATION:number = 10000;
  makeSnowFlake(){
    const delay = Math.random()*15000;
    const snowFlake = this.renderer.createElement('div');
    const initialOpacity = Math.random();
    const duration = Math.random()*6000+this.MIN_DURATION;

    this.renderer.addClass(snowFlake,'snowflake');
    this.renderer.setStyle(snowFlake,'left',`${Math.random()*window.innerWidth-20}px`);
    this.renderer.setStyle(snowFlake,'opacity',`${initialOpacity}`);
    snowFlake.animate( [
      {transform: "translateY(-8px)"},
      {transform: "translateY(100vh)"},
    ],{
      duration: duration,
      delay: delay,
      fill: "both",
      easing :'ease-in-out'
    });
    this.renderer.appendChild(this.jumbotron.nativeElement,snowFlake);
    setTimeout(()=>{
      this.renderer.removeChild(this.jumbotron.nativeElement,snowFlake);
      this.makeSnowFlake();
    }, (duration+delay));
  }
// snowFlake related::

  isViewDetailsTriggered: boolean = false;

  ngAfterViewInit(){
    // for(let i=0; i<200; i++){
    //   this.makeSnowFlake();
    // }

    console.log("Video Element?"+(this.video.nativeElement instanceof HTMLVideoElement));

    // setTimeout(()=>{
    //   this.video.nativeElement.play()
    //     .then(() => {
    //       console.log('Video playback started successfully');
    //     })
    //     .catch((error:any) => {
    //       console.error('Error starting video playback:', error);
    //     });
    // }, 1000);

    setTimeout(()=>{
      this.isViewDetailsTriggered = true;
    },500);

  }


}
