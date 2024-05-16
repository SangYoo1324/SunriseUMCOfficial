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
  styles: [`
    a{
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.3s ease; /* 트랜지션 효과 추가 */
      box-shadow: 0 10px 20px black;
      height: 20rem;
      margin-bottom: 3rem;
    }
    img{
      height: 10rem;
    }

    a:hover{
      transform: scale(1.05); /* 튀어나오는 효과를 주는 transform */
    }

    h2{
      font-size: 1.2rem;
      color: #ed4848;
    }
    p{
      font-size: 1rem;
    }

    @media (max-width: 1024px) {
      a{
        width: 100%;
      }
      img{
        width: 100%;
      }
    }

  `]
})
export class VerticalCardComponent {
  @Input('title') title!:string;
  @Input('detail') detail!:string;
  @Input('imgUrl') imgUrl!:string;
  @Input('outsideUrl') outsideUrl!:string;
}
