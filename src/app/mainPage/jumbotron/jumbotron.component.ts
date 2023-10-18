import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css'],
  animations:[
    trigger('animate_transparency',[
      state('false',style({opacity:0, visibility: 'hidden'})),
      state('true', style({opacity: 1, visibility: 'visible'}) ),
      transition('false=>true', animate('500ms ease-in')),
      transition('true=>false', animate('500ms ease-out'))
    ])
  ]
})
export class JumbotronComponent {

  isViewDetailsTriggered: boolean = false;

  ngAfterViewInit(){
    setTimeout(()=>{
      this.isViewDetailsTriggered = true;
    },500);

  }

}
