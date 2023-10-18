import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ScrollServiceService {

  private sectionIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router) { }

  setSectionId(sectionId: string): void{
    // sectionId 가 들어오면 subject에서 section ID값을 emit
    this.sectionIdSubject.next(sectionId);
  }

  getSectionId(): Subject<string>{
    return this.sectionIdSubject;
  }



}
