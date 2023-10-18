import {Component, ViewChild} from '@angular/core';
import {ChildrenYouthIntroComponent} from "../children-youth-intro/children-youth-intro.component";
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";

@Component({
  selector: 'app-children-youth',
  templateUrl: './children-youth.component.html',
  styleUrls: ['./children-youth.component.css']
})
export class ChildrenYouthComponent {

  @ViewChild('childrenYouthTitle') pageTitle!: PageTitleComponent;

  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Children & Youth';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Always welcome to visit with kids';
  }
}
