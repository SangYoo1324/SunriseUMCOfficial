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
        /*overflow: hidden;*/
          position: relative;
          width: auto;
        }

        .slider .slider-track{
          display: flex;
          width: calc(250px * 12);
        }

        .slide{
          height: 250px;
          width: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        img{
          width: 250px;
          height: 250px;
        }

        @keyframes scroll {
          0%{
            transform: translateX(0);
          }
          100%{
            transform: translateX(calc(-250px *6));
          }
        }

  `]
})
export class SliderComponent {



}
