import {Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {expander, transparency} from "../../route-animations";
import {ContentServiceService} from "../../service/content-service.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-expanding-card',
  template:`
    <h3 class="title">Check Our Ongoing Ministries</h3>

    <div class="title-row"></div>


    <div class="container no-margin-container">
      <div class="row big-wrap">

        <div class="card mb-4 m-2" style="max-width: 540px;" *ngFor="let content of contentArray let i = index">
          <div class="card-wrap row g-0">
            <div class="col-md-4">
              <img src="{{content.url}}" class="custom-img rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{content.title}}</h5>
                <p class="card-text">{{content.brief}}</p>
                <p class="card-text"><small class="text-body-secondary">from &nbsp;{{content.startDate}}</small></p>
                <div class="arrow" #arrow
                     (click)="expanderItemClick(i)"><i class="fa-sharp fa-solid fa-caret-down"></i></div>
              </div>

            </div>

            <div class="detail"  [@animate_transparency]="{value: i === currentIndex} ">
              <p>
                {{content.detail}}
              </p>
              <div class="xMark"  *ngIf="{value: i === currentIndex}"
                   (click)="xButtonClick()"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
          </div>







        </div>

      </div>
    </div>


  `,
  styles:[`
    .row.big-wrap{
      background-image:linear-gradient(to left,rgba(255,255,2550.7),rgba(255,255,255,0.1)
      ), url("/assets/ministry_bg.jpg");
      background-size: cover;
      justify-content: center;
      padding: 4rem 4rem;
      border-radius: 1rem;
      box-shadow: 5px 10px 15px rgba(0, 0, 0, 0.2);

    }

    .title{
      margin-bottom: 0.5rem;
    }

    .title-row{
      width: 100%;
      background: black;
      height: 2px;
      margin-bottom: 2rem;
    }

    .card{
      padding: 0;
      box-shadow: 10px 10px 15px rgba(0, 0, 0, 0.2);
    }

    .card-wrap{
      height: 32vh;
    }

    .card-body{
      font-size: 1.0rem;
    }

    p{
      font-size: 1rem;
      margin-bottom: 0;
    }

    .custom-img {
      width: 100%;
      height:  100%;
    }

    i{
      display: block;
      font-size: 2rem;
    }
    .arrow{
      margin-left: auto;
      width: 2rem;
      cursor: pointer;
    }

    .fa-caret-down{
      transform: rotate(180deg);
    }

    .detail{
      background-color: rgba(0,0,0,0.7);
      color: white;
      position: absolute;
      /*margin-top: 1rem;*/
      border-top: 1px solid black;
      height: 100%;
      flex: 1;
    }

    .detail>p{
      padding: 1rem;
      font-size: 0.8rem;
    }

    .clicked{
      color: bisque;
    }

    .xMark{
      display: flex;
      justify-content: right;
    }
    .fa-circle-xmark{
      display: block;
      padding-right: 0.5rem;
      color: white;
      cursor: pointer;
    }

    @media (max-width: 767px) {

      .row.big-wrap{
        padding: 0.4rem;
      }
      .card-wrap{
        height: 70vh;
      }
      .row{
        margin: 0 auto;
      }
      .no-margin-container{
        margin: 0;
        padding: 0;
      }

    }

  `],
  animations:[expander, transparency]
})
export class ExpandingCardComponent {
  @ViewChildren('arrow') arrow!:QueryList<ElementRef>;
  constructor(private renderer:Renderer2) {
  }

  @Input()contentArray : any[] = [];

  currentIndex?:number;

  // 옆에 장식용 Logo(static)
  url:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0J8ePq_4scOtaTKJoE-oOLGTpFh8gNTH47w&usqp=CAU';

  isViewDetailsTriggered: boolean= false;

  ngOnInit(){

  }

  expanderItemClick(i:number):void{
    this.currentIndex = i;
    this.renderer.setStyle(this.arrow.toArray()[i].nativeElement,'color', 'bisque');

    // 선택된 index 외에 다른 children 선택
    const otherElements = this.arrow
      .filter((element,index)=>index !==i);
  // 다른 요소들은 color black으로 바꿔줌
    otherElements.forEach(element=>{
    this.renderer.setStyle(element.nativeElement, 'color','black');
  })
  }

  xButtonClick(){
    this.currentIndex= undefined;
  }

}


