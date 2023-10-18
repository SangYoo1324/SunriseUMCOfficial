import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit{

  @ViewChild('carousel')
  carouselElement!: ElementRef;

  @Input() slideInput! : any[];


  ngAfterViewInit(): void {
    console.log(this.carouselElement);
  }



}
