import {Component, ElementRef, ViewChild} from '@angular/core';
import {trigger} from "@angular/animations";
import {transparency, widthChange} from "../../route-animations";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css'],
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
