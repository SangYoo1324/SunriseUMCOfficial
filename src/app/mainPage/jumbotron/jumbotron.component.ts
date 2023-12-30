import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
  animations:[
    trigger('animate_transparency',[
      state('false',style({opacity:0, visibility: 'hidden'})),
      state('true', style({opacity: 1, visibility: 'visible'}) ),
      transition('false=>true', animate('500ms ease-in')),
      transition('true=>false', animate('500ms ease-out'))
    ])
  ]
})
export class JumbotronComponent {

  @ViewChild('jumbotron') jumbotron!:ElementRef;
  constructor(private renderer:Renderer2) {
  }

  @ViewChild('video') video!:ElementRef;





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

    setTimeout(()=>{
      this.video.nativeElement.play()
        .then(() => {
          console.log('Video playback started successfully');
        })
        .catch((error:any) => {
          console.error('Error starting video playback:', error);
        });
    }, 1000);

    setTimeout(()=>{
      this.isViewDetailsTriggered = true;
    },500);

  }



}
