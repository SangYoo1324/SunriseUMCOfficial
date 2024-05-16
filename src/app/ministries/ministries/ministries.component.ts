import {Component, ViewChild} from '@angular/core';
import {PageTitleComponent} from "../../commonComponents/page-title/page-title.component";
import {ContentServiceService} from "../../service/content-service.service";
import {ExpandingCardComponent} from "../../commonComponents/expanding-card/expanding-card.component";
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-ministries',
  standalone: true,
  template: `
    <app-page-title #ministryTitle></app-page-title>
    <section>
      <div class="container">

        <div class="container helping-others">
          <div class="box">
            <div class="container p-3 cover">
              <h5 class="mt-2">HELPING OTHERS</h5>
              <blockquote class="blockquote">
                <p class="mb-0">You, my brothers, were called to be free. But do not use your freedom to indulge the
                  sinful nature; rather, serve one another in love.</p>
                <footer class="blockquote-footer">Galatians 5:13<cite title="Source Title"></cite></footer>
              </blockquote>
            </div>

          </div>
        </div>

        <app-section-title #sectionTitle></app-section-title>

        <div class="intro-statement">
          <p>Sunrise has an active prayer chain of prayer "warriors". If you would like to be added to our list of
            active members, please call Brad in the office.
            May we pray for you? If you have a joy or a concern you would like us to pray for, please call us at the
            office at (253) 815-6925 during office hours.
            Outside of office hours, call the office and leave a message. Or you can e-mail Brad at office&#64;sunriseunitedmethodist.org.
            Please include your name,
            the name of the person to be prayed for and what you would like us to pray about.
          </p>
        </div>
        <app-expanding-card #cardComponent
                            [contentArray]="contentItems"
        ></app-expanding-card>
      </div>
    </section>




  `,
  imports: [
    ExpandingCardComponent,
    PageTitleComponent,
    SectionTitleComponent
  ],
  styles: [`
    .title-card {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }

    /*helping others box*/
    .helping-others {
      background-image: linear-gradient(to top, rgba(255, 255, 255, .4), rgba(255, 255, 255, .6)
      ), url("/assets/Helping_Others.jpg");
      background-size: cover;
      background-position: center 40%;
      height: 300px;
      display: flex;
      align-items: center;
      margin-bottom: 4rem;
      box-shadow: 0 10px 20px black;
    }

    h5 {
      color: #ed4848;
    }

    .box {
      width: 60%;
      margin: 0 auto;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    }

    footer {
      margin-top: 1rem;
    }


    .intro-statement {
      /*width: 80%;*/
      margin: 3rem auto;
      font-size: 1.2rem;
      margin-bottom: 10rem;
    }


    @media (max-width: 767px) {
      .intro-statement {
        font-size: 1rem;
      }

      .box {
        width: 90%;

      }

    }

  `]
})
export class MinistriesComponent {

  @ViewChild('ministryTitle') pageTitle!: PageTitleComponent;
  @ViewChild('sectionTitle') sectionTitle!: SectionTitleComponent;
  @ViewChild('expandingCardComponent') cardComponent!: ExpandingCardComponent;

  // will be exported to childcomponentt expandingCard with @input()
  contentItems:any[]= [];  // contentArray (import from contentService)

  constructor(private contentService:ContentServiceService) {
  }
  ngAfterViewInit(){
    this.pageTitle.title1.nativeElement.textContent = 'Ministries';
    this.pageTitle.subTitle1.nativeElement.textContent = 'Ongoing Ministries with dedication';

    this.sectionTitle.subTitle.nativeElement.textContent = 'Ways to help others';
    this.sectionTitle.title.nativeElement.textContent = 'We can help!';
  }

  ngOnInit() {
    this.contentService.ministryObservable.subscribe(
      (item) => {
        console.log(item);
        this.contentItems.push(item);
        console.log("observable값이 push 됬는지 확인용" + this.contentItems);

      });
  }
}
