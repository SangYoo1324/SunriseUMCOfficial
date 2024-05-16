import {Component, Renderer2} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {CalendarOptions} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import {MatDialog} from "@angular/material/dialog";
import {EventModalComponent} from "./event-modal/event-modal.component";
import {Subject, takeUntil} from "rxjs";
import {ContentServiceService} from "../../service/content-service.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // subscirbe에 takeUntil pipe를 달아줘서 destroy 될 때  이 스트림에 값을 방출만 하면 바로 해제됨
  private destroy$ = new Subject<void>();

  events:any[] =[
    // {title: 'event 1', date: '2023-06-01', time:'10:10',  s3_url: "/assets/board.jpeg",
    //   description: "This is the Description of the Event details", color: 'red'},
    // {title: 'event 2', date: '2023-06-02', time:'10:10',  s3_url: "/assets/board.jpeg",
    //   description: "This is the Description of the Event details"},
    // {title: 'event 3', date: '2023-06-03', time:'10:10',  s3_url: "/assets/board.jpeg",
    //   description: "This is the Description of the Event details"}
  ]

  // basic calendar options
  calendarOptions: CalendarOptions = {
    events: this.events,
    // eventContent: this.handleEventRender.bind(this),
    eventDidMount: function(info) {
      const maxLength = 10;
      const trimmedTitle = info.event.title.length > maxLength ? info.event.title.substring(0, maxLength) + '...' : info.event.title;
      console.log("info.event.title", info.event.title);
      console.log("info.el", info.el);

      // 이벤트 요소의 title 속성을 변경하여 마우스를 올렸을 때 툴팁으로 제목이 표시되도록 설정
      info.event.setProp("title",trimmedTitle);

    },
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,
    interactionPlugin],
    // eventBackgroundColor: "ffffe0",
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.openDialog.bind(this)

  };

  ngOnInit(){

    this.contentService.calendarEventStream.pipe(takeUntil(this.destroy$)).subscribe((subj)=>{
      subj.pipe(takeUntil(this.destroy$)).subscribe((obs:any)=>{
        obs.map((data:any)=>{


          console.log("remove GMT sign"+data.date.toString().slice(0,10));
          return {
            date: data.date,
            ...data
          }
        })
       this.calendarOptions.events = obs;
       this.events = obs;
      })
    });

    // JavaScript로 aria-label이 'example'인 요소 선택
    setTimeout(()=>{
      const sundayElement = document.querySelector('[aria-label="Sunday"]');
      console.log(sundayElement);
      // 선택한 요소에 스타일 적용
      if (sundayElement instanceof HTMLElement) {
        sundayElement.style.color = 'red';
        // 다른 스타일을 적용할 수 있음
      }

      const saturdayElement = document.querySelector('[aria-label="Saturday"]');
      console.log(saturdayElement);
      // 선택한 요소에 스타일 적용
      if (saturdayElement instanceof HTMLElement) {
        saturdayElement.style.color = 'blue';
        // 다른 스타일을 적용할 수 있음
      }

    }, );
  }
  // isTitleSet: boolean = false;
  // handleEventRender(info:any){
  //   console.log("info "+ info.event.title);
  //   const maxLength = 10;
  //   const trimmedTitle = "test";
  //   if (!this.isTitleSet) {
  //     info.event.setProp('title', trimmedTitle); // 이벤트의 제목을 수정하여 title 속성으로 설정
  //     this.isTitleSet = true; // 플래그 업데이트
  //   }
  //   // this.renderer.setProperty(info.event, 'textContent', trimmedTitle);
  // }

  handleDateClick(arg:any){
    console.log('date click!   '+ arg.dateStr);
    const matchingEvents = this.events.filter(event => event.date ===arg.dateStr);
    console.log(matchingEvents);
  }

  constructor(public dialog:MatDialog, private contentService:ContentServiceService, private renderer: Renderer2) {
  }

  openDialog(arg:any){
    console.log(arg);

    this.events.forEach((data:any)=> {console.log("date", data.date.toString().slice(0,10))} );
    const argString = arg.el.fcSeg.eventRange.range.end.toString().slice(0,15);
    console.log("argString=",argString);
    const argDateObject =  new Date(argString);
    const isoArgDateString = argDateObject.toISOString().split('T')[0];
    console.log("arg date" ,isoArgDateString);
    console.log(arg.el.fcSeg.eventRange.def.title);

    let data ={

      title: this.events.filter(data=> data.date === isoArgDateString)
        //filter with title
        .filter(data=>{
          console.log("data.description", data.description);
          console.log("arg.el.fcSeg.eventRange.def.extendedProps.description ", arg.el.fcSeg.eventRange.def.extendedProps.description )
          return data.description === arg.el.fcSeg.eventRange.def.extendedProps.description
        })
        [0]
        .title,
      date: isoArgDateString,
      ...arg.el.fcSeg.eventRange.def.extendedProps

    }
    console.log(JSON.stringify(data, null, 2));

  let matDialogRef =  this.dialog.open(EventModalComponent,{data});

  // dialog 닫힌 후 추가 액션
  matDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
    console.log("dialog closed"+`${res}`);
  })
  }


  ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();
  }
}



