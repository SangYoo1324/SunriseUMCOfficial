import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-photo-event-control',
  template:`
    <section class="bg-gray">

      <div class="container">
        <h1 class="mb-5">EventPhoto Post</h1>


        <form (ngSubmit)="onSubmit(myForm.value)" #myForm = "ngForm">

          <div class="mb-3">
            <label for="title" class="form-label">title</label>
            <input #title="ngModel" required ngModel name="title" type="text" class="form-control" id="title">
            <div><small *ngIf="title.invalid && title.touched">This is required field</small></div>
          </div>

          <div class="mb-3">
            <label for="subTitle" class="form-label">subTitle</label>
            <input #title="ngModel" required ngModel name="subTitle" type="text" class="form-control" id="subTitle">
            <div><small *ngIf="title.invalid && title.touched">This is required field</small></div>
          </div>

          <div class="input-group mb-3" *ngFor="let input of photoInputs; let i = index;">
            <label class="input-group-text" >Upload</label>
            <input id="images" type="file" (change)="onFileInputChange($event, i)" #fileInput>
            <label class="file-label">

              <!--          <span *ngIf="fileInputs.get(i)">{{fileInputs.get(i)!.nativeElement.value}}</span>-->
              <!--          <span *ngIf="!fileInputs.get(i)">Choose a file...</span>-->

              <span *ngIf="photoInputs[i] !==null && photoInputs[i] !== undefined">{{photoInputs[i]?.[0]!.name}}</span>
              <span *ngIf="photoInputs[i] == null && photoInputs[i] == undefined">Choose a file...</span>
              <button type="button" (click)="upload(i)">upload</button>
            </label>
            <button type="button" (click)="addInput()">+</button>
            <button type="button" (click)="removeInput(i)">-</button>
          </div>





          <button type="submit" class="btn btn-primary" [disabled]="!myForm.valid" >Submit</button>
        </form>

      </div>
    </section>


    <style>
      #images{
        display: none;
      }
      .file-label {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 6px 12px;
        cursor: pointer;
      }
    </style>

  `,
  styles:[`

  `]
})
export class PhotoEventControlComponent {

  photoInputs:  (FileList |null) [] = [] ;
  @ViewChildren('fileInput') fileInputs!:QueryList<ElementRef<HTMLInputElement>>;
  constructor(private contentService:ContentServiceService) {

  }
  ngOnInit(){
    this.addInput();
  }

  ngAfterViewInit(){
    // photoInput은 fileInput Input DOM 에서 받은 file을 저장하는 장소.
    // fileInput(ViewChildren)만 사용하면 html단에서 초기화 문제 때문에 binding을 할 수 없다
    // fileInput에서 이미지 데이터(FileList) 받아옴 => photoInput에 FileList로 저장
    console.log(this.photoInputs);
    console.log(this.fileInputs.get(0));
  }

  addInput(){
    this.photoInputs.push(null);
    console.log('add photoFile input');
  }

  removeInput(index:number){
    this.photoInputs.splice(index,1);
  }

  // file input은 [(ngModel)] 로 바인딩할수 없어서 event로 바인딩
  onFileInputChange(event:Event, index:number){
    const inputElement = event.target as HTMLInputElement;
  const files = inputElement.files;
  if(files && files.length>0){
   console.log(this.fileInputs.get(index)?.nativeElement.value);

    this.photoInputs[index] = files;


  }else{
    this.photoInputs[index] = null;
  }
  }



  // 임의로 만들어진 input label 클릭 시 실제 fileInput 창이 클릭되게 함
  upload(i:number){
   this.fileInputs.get(i)?.nativeElement!.click();
  }

  // form submit 할 때
  onSubmit(value: {title:string, subTitle:string}){

    console.log("photo Inputs::::::::"+this.photoInputs.toString());

    //formData 생성
    const formDataToSend = new FormData();
    // title, subtitle 추가
    formDataToSend.append('title', value.title);
    formDataToSend.append('subTitle',value.subTitle);

    // add Photos( photoInput에서 fileList들을 불러와 거기서 1번째 사진만(
    // 어차피 input에서 사진 1개만 고를거라서)) 골라다가 담음
    const fileInputs = this.photoInputs;
    if(fileInputs && fileInputs.length>0){
      for(let i = 0; i<fileInputs.length; i++){
        if(fileInputs[i] !== null){
          formDataToSend.append('file',fileInputs[i]![0]);
          console.log(`image ${i}: ${fileInputs[i]![0].name}`);
        }

      }


    }
    console.log(formDataToSend.get('title'));
    console.log(formDataToSend.get('subTitle'));
    console.log(formDataToSend.getAll('file'));

    this.contentService.postEventPhoto(formDataToSend).subscribe((data)=>{
      console.log(data);
    });

  }
}
