import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-mark',
  standalone: true,
  imports: [],
  template: `
    <div class="loader">
      <div class="spinner-wrap">
        <div class="spinner-border" role="status">
        </div>
      </div>
      <div class="text-wrap">
        <div class="loading-text">Loading Initial Data...</div>
      </div>

    </div>
  `,
  styles:[`
    .spinner-wrap{
      display: flex;
      justify-content: center;
    }
    .text-wrap{
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;

    }
    .spinner-border{
      width: 5rem;
      height: 5rem;
      border-width: 1rem;
      color: gray;
    }

  `]
})
export class LoadingMarkComponent {

}
