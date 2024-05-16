import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-section-separator',
  standalone: true,
  imports: [],
  template:`
    <section class="section-separator" #separator>
      <div class="skewed" #skewed></div>
    </section>
    <style>
      section.section-separator{
        position: relative;
        /*background-color: var(--section-bg);*/
        /*background-color: white;*/
      }
      .skewed {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /*background: white;*/
        /*background-color: var(--section-bg);*/
        z-index: 0;
        transform: skewY(4deg);
        transform-origin: top right;
      }
    </style>

  `,
  styles: [`

  `]
})
export class SectionSeparatorComponent {
    @Input('reverse') reverse:boolean = false;

    @ViewChild('separator') separator!: ElementRef;
    @ViewChild('skewed') skewed!:ElementRef;

    constructor(private renderer:Renderer2) {
    }

    ngOnInit(){
    }

    ngAfterViewInit(){
      if(this.reverse){
        this.renderer.setStyle(this.skewed.nativeElement, "background-color","var(--section-bg)");
        this.renderer.setStyle(this.separator.nativeElement,"background-color", "white");
      }else{
        this.renderer.setStyle(this.separator.nativeElement, "background-color","var(--section-bg)");
        this.renderer.setStyle(this.skewed.nativeElement,"background-color", "white");
      }
    }
}
