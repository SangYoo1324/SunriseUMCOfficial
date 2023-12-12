import {Component, ElementRef, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {NgForm} from "@angular/forms";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // section Title control variable
  @ViewChild('sectionTitleComponent') visitorInfoTitle!: SectionTitleComponent;

  constructor(private contentService:ContentServiceService) {
  }

  ngAfterViewInit(){
    // section Title control
    this.visitorInfoTitle.title.nativeElement.textContent = 'Contact Info';
    this.visitorInfoTitle.subTitle.nativeElement.textContent = 'Always welcome to ask';
  }

  leaveMessage(value:any){

  this.contentService.postMessage(this.objectToFormData(value)).subscribe((resp)=>{
    alert("Your Message has been sent successfully");
  });
  console.log("submit button click");

  }

  objectToFormData(obj:any){
    const formdata = new FormData();
    for(const key in obj){
      if(obj.hasOwnProperty(key)){
        formdata.append(key,obj[key]);
      }
    }
    return formdata;
  }
}
