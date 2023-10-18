import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
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
