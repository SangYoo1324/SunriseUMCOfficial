import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonComponentModuleModule} from "../../module/common-component-module.module";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {VerticalCardComponent} from "../../commonComponents/vertical-card/vertical-card.component";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    CommonComponentModuleModule,
    VerticalCardComponent,
    NgFor
  ],
  template:`<section>
    <app-section-title #sectionTitle></app-section-title>
    <div class="container">
      <div class="row">
        <div class="col-lg-4" *ngFor="let res of resources">
          <app-vertical-card
            [title]="res.title"
            [detail]="res.detail"
            [imgUrl]="res.imageUrl"
            [outsideUrl]="res.outsideUrl"
          ></app-vertical-card>
        </div>
      </div>
    </div>
  </section>`,
  styleUrl: './resources.component.css'
})
export class ResourcesComponent {

  resources:any[]=[
    {
      title: 'Area Assistance Programs',
      detail:'Having trouble making ends meet? Learn about some of the area assistance organizations and programs.\n',
      imageUrl:"/assets/areaAssistantProgram.jpg",
      outsideUrl: 'http://www.sunriseunitedmethodist.org/assistancePrograms.asp'
    },
    {
      title: 'Daily Devotional',
      detail:'Take a few minutes to focus and consider the bible verse given for the day in your life.\n' +
        '\n' +
        'Produced by Upper Room Ministries.',
      imageUrl:"/assets/dailyDevotional.jpg",
      outsideUrl: 'https://www.upperroom.org/devotional/'
    },
    {
      title: 'oremus Bible Browser',
      detail:'Read the Bible online or look up Bible verses.',
      imageUrl:"/assets/bible.jpg",
      outsideUrl: 'https://bible.oremus.org/'
    },
    {
      title: 'Christian History Institute ',
      detail:'The Christian History Institute\'s goal is to preserve and share the history of the church.',
      imageUrl:"/assets/christian.jpg",
      outsideUrl: 'https://chitorch.org/'
    },
    {
      title: 'Electric Giving',
      detail:'Link for Electronic Giving',
      imageUrl:"/assets/donation.jpg",
      outsideUrl: 'https://secure.myvanco.com/YPTG'
    }
  ];

  @ViewChild('sectionTitle') sectionTitle!:SectionTitleComponent;

  ngAfterViewInit(){
    this.sectionTitle.title.nativeElement.textContent = 'Resources';
    this.sectionTitle.subTitle.nativeElement.textContent = 'Get some Useful Links!';
  }
}
