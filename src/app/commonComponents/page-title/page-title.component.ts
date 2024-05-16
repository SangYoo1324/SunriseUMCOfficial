import {Component, ElementRef, ViewChild} from '@angular/core';
import {trigger} from "@angular/animations";
import {transparency, widthChange} from "../../route-animations";

@Component({
  selector: 'app-page-title',
  template:`
    <section class="page_title">


      <div class="text_wrap">
        <h1 [@animate_transparency]="titlePageAnimationInit" #title></h1>
        <div class="line" [@animate_widthChange]="titlePageAnimationInit"></div>
        <p [@animate_transparency]="titlePageAnimationInit"#subTitle></p>
      </div>


    </section>

  `,
  styles:[`
    section{
      background:linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('/assets/christmasTheme.jpg');
      background-size: cover;

      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 250px;
    }

    .line{
      height: 0.1rem;
      background-color: white;
      width: 30%;
      margin: 0.5rem auto;
    }

    .text_wrap{
      margin-top: 5rem;
      width: 30%;
      text-align: center;
      color: white;

    }

    @media (max-width: 767px) {
      .text_wrap, .line{
        width: 70%;
      }
      h1 {
        font-size: 1.5rem;
      }
      p{
        font-size: 1rem;
      }

    }




  `],
  animations:[
    transparency,
    widthChange
  ]
})
export class PageTitleComponent {
  titlePageAnimationInit:boolean = false;


  @ViewChild('title') title1!: ElementRef;
  @ViewChild('subTitle') subTitle1!: ElementRef;

  ngOnInit(){
    // titlePageAnimation을 true로 변경해서 animation 시작
   setTimeout(()=>{
      this.titlePageAnimationInit= true;

    },300);
  }

  ngOnDestroy(){
    this.titlePageAnimationInit = false;
  }
}
