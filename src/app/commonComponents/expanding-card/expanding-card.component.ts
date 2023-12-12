import {Component, ElementRef, Input, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {expander, transparency} from "../../route-animations";
import {ContentServiceService} from "../../service/content-service.service";
import {elementAt} from "rxjs";

@Component({
  selector: 'app-expanding-card',
  templateUrl: './expanding-card.component.html',
  styleUrls: ['./expanding-card.component.css'],
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


