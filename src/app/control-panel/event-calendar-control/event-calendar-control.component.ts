import {Component, ElementRef, ViewChild} from '@angular/core';
import {AppModule} from "../../app.module";
import {FormGroup, FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ContentServiceService} from "../../service/content-service.service";
import {MatTableModule} from "@angular/material/table";

@Component({
  selector: 'app-event-calendar-control',
  standalone: true,
  template:`
    <section class="bg-gray">
      <!--  <input #inputDate type="date">-->
      <!--  <button (click)="test()">test</button>-->


      <div class="container">

        <form (ngSubmit)="onSubmit(myForm.value)" #myForm = "ngForm">

          <h1 class="mb-5">Event Calendar Control Panel</h1>
          <label class="form-label">Title</label>
          <input class="form-control" type="text" name="title" ngModel required>

          <label class="form-label">Date</label>
          <input class="date form-control" type="date" name="date" ngModel required>

          <label class="form-label">Time</label>
          <div class="time-wrap">
            <input class="hour form-control" type="number" name="hour"
                   min="0" max="24" ngModel required
                   [(ngModel)]="hour"
            >
            <p>&nbsp;:&nbsp;</p>
            <input class="min form-control" type="number" name="min"
                   min="0" max="59" ngModel required
                   [(ngModel)]="min">
            <select [(ngModel)]="ampm" required  class="form-control ampm"  name="ampm">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>


          <label  class="form-label">Description</label>
          <textarea  class="form-control" name="description" ngModel required>
    </textarea>

          <label class="form-label">TitlePhoto</label>
          <div class="input-group mb-3">
            <label class="input-group-text" >Upload</label>
            <input id="images" type="file" accept="image/*" (change)="onFileInputChange($event)"  #fileInput>
            <label class="file-label">
              <span *ngIf="!fileInput.value">Choose a file...</span>
              <span *ngIf="fileInput.value">{{fileInput.value}}</span>
              <button type="button" (click)="upload()">upload</button>
            </label>
          </div>

          <div class="input-group-submit">
            <select [(ngModel)]="selectedEventType" ngModel required name="eventType">
              <option [ngValue]="1" > Non Recurring Event</option>
              <option [ngValue]="2">Weekly Recurring Event</option>
              <option [ngValue]="3">Monthly Recurring Event</option>
            </select>
            <button
              type="submit" class="btn btn-primary" [disabled]="!myForm.valid && (photoInput===undefined)" >Submit</button>
          </div>


        </form>

        <div class="autopop-wrap">
        </div>

      </div>




    </section>

  `,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    MatTableModule
  ],
  styles:[`
    .autopop-wrap{
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
    }

    .time-wrap{
      display: flex;

    }

    .time-wrap>p{
      margin: 0;
    }

    .input-group-submit{
      display: flex;
      justify-content: space-between;
    }
    select{
      border: none;
      outline: none;
      margin-left: 5px;
      width: 300px;
      padding: 1rem;
      border-radius: 1rem;
    }
    .hour{
      width: 100px;
    }
    .min{
      width: 100px;
    }
    .date{
      width: 330px;
    }


    /*imageInput 관련 */
    #images{
      display: none;
    }
    .file-label {
      display: inline-block;
      border: 1px solid #ccc;
      padding: 6px 12px;
      cursor: pointer;
    }


  `]
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


