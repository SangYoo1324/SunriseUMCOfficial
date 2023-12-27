import {Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-section-separator',
  standalone: true,
  imports: [],
  templateUrl: './section-separator.component.html',
  styleUrl: './section-separator.component.css'
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
