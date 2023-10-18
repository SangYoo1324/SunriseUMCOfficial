import { Component } from '@angular/core';
import {ContentServiceService} from "../../service/content-service.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {filter, map, Observable, of} from "rxjs";


@Component({
  selector: 'app-sermon-archive',
  templateUrl: './sermon-archive.component.html',
  styleUrls: ['./sermon-archive.component.css']
})
export class SermonArchiveComponent {

  //pagination related setting
  limit:number=10;
  totalNumber:number= 0;



  sermonObservable$!:Observable<any>;
   url!:SafeResourceUrl;
  constructor(private contentService:ContentServiceService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(){


    this.sermonObservable$ = this.contentService.fetchSermons();
    this.sermonObservable$.pipe(
      map((items)=>items.length)
    ).subscribe( (length)=>{
      this.totalNumber = length;
    })
  }

  currentPage: number = 1;
  changePage(page: number):void{
    this.currentPage = page;
    console.log("current page from parent component::"+this.currentPage);



  }

}
