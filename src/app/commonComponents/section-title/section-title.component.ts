import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template:`
    <div class="container section-title-comp-container">
      <div class="title_comp">
        <h3 #subTitle></h3>
        <h1 #title></h1>
        <ng-content></ng-content>
      </div>
    </div>

    <style>
      .section-title-comp-container{
        width: 95%;
        position: relative;
      }

      .title_comp>*{
        transition: transform 1s ease-in-out;

      }

      .title_comp{
        padding-bottom: 3rem;
      }

      h3 {
        color: black;
        padding-bottom: 1rem;
      }
      h1{
        font-size: 3.5rem;
        color: #ed4848;
      }

      .section-title-comp-container::before {
        position: absolute;
        content: "";
        display: block;
        width: 0.2em; /* 짝대기의 너비를 조절 */
        height: 120px; /* 짝대기의 높이를 조절 */
        background-color: rgba(0,0,0,0.7); /* 짝대기의 색상 설정 */
        margin-right: 1rem; /* 짝대기와 제목 사이의 간격 조절 */
        left: -1%;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
      }

      @media (max-width: 767px) {
        h3{ font-size:  1.5rem}
        h1{font-size: 2rem;
        }

        .section-title-comp-container{
          width: 85%;
        }
        .section-title-comp-container::before {
          left: -2%;
          height: 120px;
        }
      }
    </style>

  `,
  styles:[`

  `]
})
export class SectionTitleComponent {

  @ViewChild('subTitle') subTitle!:ElementRef;

  @ViewChild('title') title!:ElementRef;

  intersectionObserver:IntersectionObserver | undefined;


  constructor(private renderer: Renderer2){
    // intersectionObserver 생성


  }

  ngAfterViewInit():void{
    this.intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry=>{
          if(entry.isIntersecting){
            this.renderer.setStyle(entry.target, 'transform', 'translateX(0)');
            console.log("is intersecting");
          }
          else{
            this.renderer.setStyle(entry.target, 'transform', 'translateX(-50%)')
            // console.log("is NOT intersecting");
          }
        })
      }
    );
    //intersectionObserver로 subtitle과 title 감시
    this.intersectionObserver.observe(this.subTitle.nativeElement);
    this.intersectionObserver.observe(this.title.nativeElement);
  }

  ngOnDestroy():void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
