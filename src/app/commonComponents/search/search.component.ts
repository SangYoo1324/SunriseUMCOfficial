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
