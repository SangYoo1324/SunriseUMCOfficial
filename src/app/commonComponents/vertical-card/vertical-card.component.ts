import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-vertical-card',
  standalone: true,
  imports: [],
  template:`
    <a href="{{outsideUrl}}" class="card">
      <img [src]="imgUrl" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="title"> {{title}}</h2>
        <p class="card-text">
        {{detail}}
        </p>
      </div>
    </a>
  `,
  styleUrl: './vertical-card.component.css'
})
export class VerticalCardComponent {
  @Input('title') title!:string;
  @Input('detail') detail!:string;
  @Input('imgUrl') imgUrl!:string;
  @Input('outsideUrl') outsideUrl!:string;
}
