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
  styleUrl: './loading-mark.component.css'
})
export class LoadingMarkComponent {

}
