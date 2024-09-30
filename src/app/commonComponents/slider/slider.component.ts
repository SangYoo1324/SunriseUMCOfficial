import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  template: `
    <div class="slider">
      <div class="slider-track">

        <div class="slide"><img src="../../../assets/children_youth/cy_1.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_2.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_3.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_4.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_5.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_6.jpg" alt=""></div>

        <div class="slide"><img src="../../../assets/children_youth/cy_7.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_8.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_9.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_5.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_6.jpg" alt=""></div>
        <div class="slide"><img src="../../../assets/children_youth/cy_7.jpg" alt=""></div>
      </div>
    </div>

  `,
  styles: [`

        .slider{
          overflow: hidden;
          position: relative;
          width: auto;
          border-radius: 2rem;
        }

        .slider .slider-track{
          display: flex;
          width: calc(350px * 12);
          border-radius: 2rem;
          animation: scroll 30s linear infinite;
        }

        .slide{
          height: 350px;
          width: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img{
          width: 350px;
          height: 350px;


        }

        @keyframes scroll {
          0%{
            transform: translateX(0);
          }
          100%{
            transform: translateX(calc(-350px *6));
          }
        }

  `]
})
export class SliderComponent {



}
