import { Injectable } from '@angular/core';
import {filter, from, map, Observable, of, Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {dev_environment} from "../env/environment";
import {prod_environment} from "../env/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class ContentServiceService {

  private prod_apiUrl = prod_environment.apiUrl;
  private dev_apiUrl = dev_environment.apiUrl;

  private apiUrl = this.prod_apiUrl;


  contentItems:any[] = [
    {url: '/assets/VBS_1.jpg',
      title: 'Childeren\'s kindergarten',
      detailUrl: 'assets/VBS_1.jpg',
      detailTitle: 'Children\'s Kindergarten - 5th Grade Sunday School'},

    {url: '/assets/VBS_2.jpg',
      title: 'Pre-school Age Sunday School',
      detailUrl: 'assets/VBS_2.jpg',
      detailTitle: 'Pre-school Age Sunday School'
    },
    {url: '/assets/VBS_3.jpg',
      title: 'Sunrise United Methodist Youth Group',
      detailUrl: 'assets/VBS_3.jpg',
    detailTitle: 'Sunrise United Methodist Youth Group (SUMY)'}
  ];

  ministryItems:any[]= [
    {
      url: '/assets/pray.jpg',
      title: 'Prayer Chain',
      brief:'May we pray for you? If you have a joy or a concern you would like us to pray for, please call us at the',
      detail:'Sunrise has an active prayer chain of prayer "warriors". If you would like to be added to our list of active members, please call Brad in the office.\n' +
        '\n' +
        'May we pray for you? If you have a joy or a concern you would like us to pray for, please call us at the ' +
        'office at (253) 815-6925 during office hours. Outside of office hours, call the office and leave a message.' +
        ' Or you can e-mail Brad at office@sunriseunitedmethodist.org. Please include your name, the name of the ' +
        'person to be prayed for and what you would like us to pray about.',
      startDate: '03/03/23'
    },
    {
      url: '/assets/prayerShawls.jpg',
      title: 'Prayer Shawl Ministry',
      brief:'May we pray for you? If you have a joy or a concern you would like us to pray for, please call us at the',
      detail:'Care and the love of knitting or handcraft have been combined into a prayerful and powerful ministry that reaches out to those in need of comfort and solace.\n' +
        '\n' +
        'Members of our church make these wonderful and comforting creations with prayers for usually an unknown recipient. When completed the whole congregation prays over them for their recipients.\n' +
        '\n' +
        'Shawls are given to comfort those who are undergoing medical procedures, who have had a great loss or under great stress. They are also given for times of celebration such as marriage, bridal showers, or graduation.',
      startDate: '01/03/22'
    },
    {
      url: '/assets/donate.jpg',
      title: 'DONATIONS FOR TOILETRY ITEMS',
      brief:'May we pray for you? If you have a joy or a concern you would like us to pray for, please call us at the',
      detail:'Going on vacation or a business trip? Staying in a hotel? How about going to the dentist?\n' +
        '\n' +
        'Remember to bring in your unused, unopened toothbrushes, toothpaste, toiletry items, etc. all year long for Family Packs put together by the women\'s group. Place them in the large wicker basket outside the sanctuary doors marked UMW Family Packs.\n' +
        '\n' +
        'Family Packs are put together for area families and given out at Christmas time.',
      startDate: '01/03/19'
    }
  ];

  sermonObject:any[]= [
    {
      id: 1,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/aqQvDktH__4'),
      title: 'Worship for June 11, 2023',
      date: '06-11-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id: 2,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/v5FYwtzYG44'),
      title: 'Worship for June 4, 2023',
      date: '06-04-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:3,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/iry4jY5zzDU'),
      title: 'Worship for May 28, 2023',
      date: '05-28-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },

    {
      id:4,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/ADRVT-T3e_k'),
      title: 'Worship for May 21, 2023',
      date: '05-21-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:5,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/dxB5ZAA5L6M'),
      title: 'Worship for May  14, 2023',
      date: '05-14-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:6,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/UcXucbXtoMM'),
      title: 'Worship for May  7, 2023',
      date: '05-07-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },

    {
      id:7,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('"https://www.youtube.com/embed/AWlqVaKBn2M'),
      title: 'Worship for Apr  30, 2023',
      date: '04-30-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:8,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/-MUu7tz3kXc'),
      title: 'Worship for Apr 23, 2023',
      date: '04-23-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:9,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/xQhqMzTqKDg'),
      title: 'Worship for Apr  16, 2023',
      date: '04-16-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:10,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/te9fXaQcxyQ'),
      title: 'Worship for apr  09, 2023',
      date: '04-09-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
    {
      id:11,
      iframe: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/Oz9w8cXik7s'),
      title: 'April 7, 2023 Good Friday worship-SUMC',
      date: '04-07-2023',
      hym: ['Here I Am to Worship', 'I exalt you Lord'],
      scripture: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16 (NIV)\n' +
        '\n' +
        'This verse is one of the most well-known and widely quoted verses in the Bible, emphasizing God\'s love for humanity and the promise of eternal life through faith in Jesus Christ.'
    },
  ];



  //circleContent 관련 서비스
  childrenYouthObservable:Observable<any> = from(this.contentItems);

  currentCircleContentNumber:Subject<number> = new Subject<number>();
  constructor(private sanitizer: DomSanitizer, private http:HttpClient) { }

  numberClickEvent(i:number):void{
    this.currentCircleContentNumber.next(i);
  }

  // Expanding card 관련 서비스
  ministryObservable:Observable<any> =
    from(this.ministryItems);
  //   new Observable<any>((observer)=>{
  //   this.ministryItems.forEach((item)=>{
  //     observer.next(item);
  //   });
  // });

  // sermonObject 관련 서비스

  sermonObservable!:Observable<any>
   // = of(this.sermonObject)



  postSermon(data:{iframe:string,hyms:{id:any | null, value:string}[],date:Date, scripture:string,title:string}){


  return  this.http.post(this.apiUrl+'api/sermon',data);

  }

  deleteSermon(id:number){
   return this.http.delete(this.apiUrl+`api/sermon/${id}`)

  }


// sermon Data를 bakcend로부터 받아서 url만 pipe로 가공해준다
  fetchSermons(){
   return this.http.get(this.apiUrl+"api/sermon")
      .pipe(map((items:any)=>items.map((item:any)=>{
        item.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(item.iframe);
        return item;
      })));

  }




  eventPhotos:any[] = [
    {
      id: 1,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 2,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 3,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 4,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 5,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 6,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 7,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 8,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 9,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 10,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 11,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 12,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 13,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'This is Title',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    },
    {
      id: 14,
      img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
      title: 'Title for search test',
      subTitle: 'SubTitle goes her for brief Explanation',
      date: '2023-03-21'
    }

  ];
  // event photos 관련 서비스
  // eventPhotosObservable$:Observable<any>
  // = of(this.eventPhotos);

// {
//   id: 1,
//   img: ['/assets/biblepic.jpg','/assets/church_background.jpg', '/assets/prayerShawls.jpg'],
//   title: 'This is Title',
//   subTitle: 'SubTitle goes her for brief Explanation',
//   date: '2023-03-21'
// },

  postEventPhoto(data:FormData){
    // const headers = new HttpHeaders()
    //   .set('Content-Type', 'multipart/form-data')
    //   .set('Accept', 'application/json');
    return this.http.post(this.apiUrl+"api/photo",data);
  }

  fetchEventPhoto(){
    return this.http.get(this.apiUrl+"api/photo");
  }



}
