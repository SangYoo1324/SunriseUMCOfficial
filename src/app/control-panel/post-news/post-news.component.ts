import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-post-news',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  template: `<section>
    <div class="container">
      <form (ngSubmit)="onSubmit(myForm.value)" #myForm = "ngForm">
        <h1 class="mb-5">News Control Panel</h1>

        <label class="form-label">Title</label>
        <input class="form-control" type="text" name="title" ngModel required>

        <label class="form-label">Start Date</label>
        <input class="date form-control" type="date" name="startDate" ngModel required>

        <label class="form-label">End Date(if exists)</label>
        <input class="date form-control" type="date" name="endDate" ngModel>


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
          <div class="mb-3 form-check">
            <input ngModel name="recurring" type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Is it Weekly Recurring Event?</label>
          </div>
          <button
            type="submit" class="btn btn-primary" [disabled]="!myForm.valid && (photoInput===undefined)" >Submit</button>
        </div>

      </form>
    </div>
  </section>



  `,
  styles:[`

    section{
      background-color: #cccccc;
    }

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
export class PostNewsComponent {

  constructor(private contentService:ContentServiceService) {
  }

  hour:number = 0;
  min:number= 0;
  ampm:string = 'AM';
  photoInput!:(FileList | null);
  @ViewChild("fileInput") fileInput!:ElementRef;

  onSubmit(values:any){
    console.log(values);

    const formDataToSend = new FormData();
    formDataToSend.append('title',values.title);
    formDataToSend.append('startDate', values.startDate);
    formDataToSend.append('endDate', values.endDate);
    formDataToSend.append('recurring', values.recurring ? 'true': 'false');
    formDataToSend.append('description', values.description);

    const dayOfWeek = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    //nth day of the week
    formDataToSend.append('dayOfWeek',dayOfWeek[new Date(values.startDate).getDay()]);
    const formattedTime = `${values.hour.toString().padStart(2,'0')} : ${values.min.toString().padStart(2, '0')} ${values.ampm}`;

    formDataToSend.append('time', formattedTime);

    if(this.fileInput != null){
      formDataToSend.append('file', this.photoInput![0])
    }

    //checking formData
    formDataToSend.forEach( (value, key)=>{
      console.log(`${key} : ${value}`);
    });

    this.contentService.postNews(formDataToSend).subscribe(()=>{
        this.contentService.loadNews();
        alert("Successfully uploaded News");
    });



  }

  onFileInputChange(event:Event){
    console.log(event.target);
    // hand over fileInput into photoInput(fileList)
    this.photoInput = this.fileInput.nativeElement.files;
  }

  upload(){
    this.fileInput.nativeElement.click();
  }

}
