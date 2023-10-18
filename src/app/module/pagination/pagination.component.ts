import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  @Input() currentPage: number= 1;
  @Input() total: number = 0;
  @Input() limit: number= 5;

  @Output() changePage = new EventEmitter<number>();

  pages: number[] = [];

  ngOnInit(): void {
    console.log("total: "+ this.total);
    console.log("limit: "+ this.limit);
    const pagesCount = Math.ceil(this.total / this.limit);
    console.log("pageCount: "+pagesCount);

    this.pages = this.range(1,pagesCount);
    console.log(this.pages); // page들이 array로 출력됨
  }

  range(start:number, end: number):number[]{
    return [...Array(end).keys()].map(el =>el +start);
  }
}
