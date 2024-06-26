import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <div *ngIf="images && images.length >0" class="carousel-container" [ngClass]="{'box-shadow': boxShadow ==='black'}">
      <!--  <ng-container *ngFor="let image of images; let i = index">-->
      <img *ngFor="let image of images; let i = index" [src]="image.url" [alt]="image.imageAlt"
           [ngClass]="{'image-active':selectedIndex ===i}" class="car-fade">
      <div *ngFor="let image of images; let i = index" class="right" [ngClass]="{'image-active':selectedIndex ===i}">
        <!--    <div class="text-wrap">-->
        <!--      <div class="title"><p>{{image.title}}</p></div>-->
        <!--      <div [ngStyle]="{'color': subTitleColor}"><p><small>"&nbsp;{{image.subTitle}}&nbsp;"</small></p></div>-->
        <!--      <div class="poster" *ngIf="image.poster">- {{image.poster}}</div>-->
        <!--&lt;!&ndash;      <button class="btn-1"><h5>{{image.buttonText}}</h5></button>&ndash;&gt;-->
        <!--    </div>-->
      </div>
      <!--  </ng-container>-->


      <div *ngIf="indicators" class="carousel-dot-container">
    <span *ngFor="let dot of images let i = index" class="dot"
          [ngClass]="{'active': selectedIndex === i}"
          (click)="selectImage(i)"></span>
      </div>

      <div *ngIf="controls" class="btn-carousel btn-prev">
        <i (click)="onPrevClick()"
           class="fas fa-arrow-circle-left icon-carousel icon-prev"></i></div>

      <div *ngIf="controls" class="btn-carousel btn-next">
        <i (click)="onNextClick()"
           class="fas fa-arrow-circle-right icon-carousel icon-next"></i></div>
    </div>




  `,
  imports: [
    NgIf,
    NgForOf,
    NgClass
  ],
  styles: [`
    .carousel-container {
      position: relative;
      margin: auto;
      text-align: center;
      width: 100%;
      padding: 0;
      /*border-radius: 15px;*/
      box-shadow: 0 10px 20px #dce1e1;
      display: flex;
    }

    .box-shadow {
      box-shadow: 0 10px 20px black;
    }


    .carousel-container img {
      display: none;
      /*border-radius: 15px;*/
    }

    .carousel-container img.image-active {
      display: block;
      width: 100%;
      max-height: 40vh;

      /*border-radius: 15px 0 0 15px;*/
    }


    /*text wrap */

    .right {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 50%;
      bottom: 5%;
      background-color: transparent;
      font-size: 1.5rem;
      display: none;
      align-items: center;
    }

    .title {
      margin-top: 0.3rem;
    }

    p {
      font-size: 0.9rem;
      margin-bottom: 0.1rem;
    }

    .right.image-active {
      display: flex;
    }

    button {
      background-color: transparent;
      padding: 1rem 2rem;
      margin-top: 2rem;
      color: white;
      border: 1px solid white;
    }

    .text-wrap {
      /*text-align: left;*/
      max-height: 70px;
      margin-bottom: 1.5rem;
      color: white;
      padding: 0.5rem .5rem;
      background: rgba(100, 100, 100, 0.6);
      border-radius: 1rem;

    }

    h1 {
      color: red;
    }

    /*.subTitle{*/
    /*  color: #ffbb33;*/
    /*}*/

    /*text wrap:end */

    /*dots indicator*/
    .carousel-dot-container {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      padding: 0;
      margin-bottom: 1rem;
    }

    .dot {
      cursor: pointer;
      height: 13px;
      width: 70px;
      margin: 0 5px;
      background-color: #fff;
      /*border-radius: 50%;*/
      display: inline-block;
      opacity: 0.3;
      transition: opacity 0.6s ease;
    }

    .active, .dot:hover {
      opacity: 1;
    }

    .car-fade {
      animation-name: car-fade;
      animation-duration: 1.5s;
    }

    .btn-carousel {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15%;
      padding: 0;
      color: #fff;
      text-align: center;
      background: 0 0;
      border: 0;
      cursor: pointer;
    }

    .btn-prev {
      left: 0;
    }

    .btn-next {
      right: 0;
    }

    .icon-carousel {
      opacity: 0.5;
      transition: all 0.15s ease;
    }

    .icon-carousel:hover {
      color: #fff;
      opacity: 0.9;
    }

    .icon-carousel:active {
      opacity: 0.5;
    }

    .icon-prev {
      font-size: 2rem;
    }

    .icon-next {
      font-size: 2rem;
    }

    @keyFrames car-fade {
      from {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }


    @media (max-width: 768px) {

      .carousel-dot-container {

      }

      .dot {
        width: 50px;
        height: 10px;
      }

      /*.carousel-container img.image-active{*/
      /*  display: block;*/
      /*  width: 100%;*/
      /*  height: 400px;*/
      /*  border-radius: 0;*/
      /*}*/
      /*.carousel-container{*/
      /*  display: block;*/
      /*}*/
      /*.right{*/
      /*  background-color: black;*/
      /*  height: 400px;*/
      /*  position: relative;*/
      /*  !*right: 0;*!*/
      /*  width: 100%;*/
      /*  border-radius: 0;*/
      /*}*/
      /*.text-wrap{*/
      /*  text-align: center;*/
      /*}*/

    }

  `]
})
export class CarouselComponent implements AfterViewInit{

  @Input() images: any[] =[];
  @Input() indicators= true;
  @Input() controls = false;
  @Input() autoSlide = true;
  @Input() slideInterval = 5000;
  @Input() boxShadow = 'black';
  @Input() subTitleColor = '#ffbb33';
  selectedIndex = 1;
  ngOnInit() {

  }

  autoslideImages():void{
    setInterval(()=>{
      this.onNextClick();
    }, this.slideInterval);
  }

  selectImage(i:number){
    this.selectedIndex = i;
  }

  onPrevClick(){
    if(this.selectedIndex === 0){
      this.selectedIndex = this.images.length-1;
    }else{
      this.selectedIndex --;
    }
  }

  onNextClick(){
    if(this.selectedIndex === this.images.length-1){
      this.selectedIndex = 0;
    }else{
      this.selectedIndex ++;
    }
  }

  ngAfterViewInit(): void {
    if(this.autoSlide){
      this.autoslideImages();
    }
  }



}
