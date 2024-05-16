import { Component } from '@angular/core';
import {NewsItemComponent} from "../news-item/news-item.component";

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [
    NewsItemComponent
  ],
  template: `



        <app-news-item></app-news-item>


  `,
  styles: [`

  `]
})
export class SwiperComponent {

}
