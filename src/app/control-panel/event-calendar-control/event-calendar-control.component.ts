import {Component, ElementRef, ViewChild} from '@angular/core';
import {AppModule} from "../../app.module";
import {FormGroup, FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ContentServiceService} from "../../service/content-service.service";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-event-calendar-control',
  standalone: true,
  templateUrl: './event-calendar-control.component.html',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatTableModule
  ],
  styleUrl: './event-calendar-control.component.css'
})
export class EventCalendarControlComponent {
  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;



  constructor(private contentService:ContentServiceService) {
  }
  ngOnInit() {


  }

  @ViewChild("inputDate") inputDate!: ElementRef;
  hour = '00';
  min = '00';
  ampm = 'AM';
  photoInput!: (FileList | null);
  selectedEventType: number = 1;
  onSubmit(values: any) {
    console.log(values);
    console.log(this.fileInput.nativeElement.value);

    const formDataToSend = new FormData();
    formDataToSend.append('title',values.title);
    formDataToSend.append('date',values.date);
    formDataToSend.append('description',values.description);

    const formattedTime
      = `${values.hour.toString().padStart(2,'0')}: ${values.min.toString().padStart(2,'0')} ${values.ampm}`
    formDataToSend.append("time", formattedTime);
    if(this.fileInput != null){
      formDataToSend.append('file', this.photoInput![0]);
      switch(this.selectedEventType){
        case 1: {
          this.contentService.postCalendarEvent(formDataToSend)
            .subscribe((res)=>{
              this.contentService.loadCalendarEvent();
              alert("successfully uploaded");
            });
          // logic to transfer data to backend server
          break;
        }
        case 2: {
          this.contentService.postWeeklyRecurringCalendarEvent(formDataToSend)
            .subscribe((res)=>{
              this.contentService.loadCalendarEvent();
              alert("successfully uploaded Weekly Recurring Event");
            });
          break;
        }
        case 3:{
          this.contentService.postMonthlyRecurringCalendarEvent(formDataToSend)
            .subscribe((res)=>{
              this.contentService.loadCalendarEvent();
              alert("successfully uploaded Monthly Recurring Event");
            });
          break;
        }

      }



    }else{
      alert("Event Picture hasn't been uploaded");
      return;
    }
  }


  test() {
    console.log(this.inputDate.nativeElement.value);
  }


  //just programatically clicking the invisible acutal
  // upload button
  upload() {
    this.fileInput.nativeElement.click();

  }

  // image 업로드 된거 변경 감지
  onFileInputChange(event:Event) {
      console.log(event.target);
    this.photoInput = this.fileInput.nativeElement.files!;
  }

}


