import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
    input:string= '';

    @Output()
    inputEvent:EventEmitter<string>= new EventEmitter<string>();

    inputEventEmitter(){

      this.inputEvent.emit( this.input);
    }
}
