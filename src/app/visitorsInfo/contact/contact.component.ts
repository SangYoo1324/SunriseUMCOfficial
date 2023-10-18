import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // section Title control variable
  @ViewChild('sectionTitleComponent') visitorInfoTitle!: SectionTitleComponent;

  ngAfterViewInit(){
    // section Title control
    this.visitorInfoTitle.title.nativeElement.textContent = 'Contact Info';
    this.visitorInfoTitle.subTitle.nativeElement.textContent = 'Always welcome to ask';
  }
}
