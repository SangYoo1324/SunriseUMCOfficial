import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <div class="container">
      <div class="wrap">
        <h4>search:</h4>
        <input type="text" [(ngModel)]="input">
        <button><i (click)="inputEventEmitter()" class="fa-solid fa-magnifying-glass"></i></button>
        <button class="refresh-icon" (click)="refreshPageEventEmitter()">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  `,
  imports: [
    FormsModule
  ],
  styles: [`
    h4 {
      display: flex;
      width: 30%;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    input {
      width: 55%;
      font-size: 1rem;
      height: 2rem;
    }

    button:hover {
      background-color: #1e2125;
      color: white;
      cursor: pointer;
    }

    button,
    .refresh-icon {
      width: 15%;
      height: 2rem;
      margin-left: 0.2rem;
      background: transparent; /* 배경을 투명하게 설정 */
      border: 1px solid #ccc; /* 테두리 추가 */

    }

    i {
      font-size: 1.0rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .container {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 1rem;
    }

    .wrap {
      width: 25%;
      display: flex;
    }

    @media (max-width: 1024px) {
      .wrap {
        width: 95%;
      }
    }
  `]
})
export class SearchComponent {
    input:string= '';

    @Output()
    inputEvent:EventEmitter<string>= new EventEmitter<string>();
    @Output()
    refreshEvent:EventEmitter<any> = new EventEmitter<string>();

    inputEventEmitter(){
      if(this.input =="") alert("Please Enter Search Keyword!");
      this.inputEvent.emit( this.input);
    }

    refreshPageEventEmitter(){
      this.refreshEvent.emit("");
      this.input = "";
    }
}
