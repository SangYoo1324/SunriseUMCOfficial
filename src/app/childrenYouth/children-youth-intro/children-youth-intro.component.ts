import {Component, ViewChild} from '@angular/core';
import {SectionTitleComponent} from "../../commonComponents/section-title/section-title.component";
import {RightIntroSectionComponent} from "../../commonComponents/right-intro-section/right-intro-section.component";

@Component({
  selector: 'app-children-youth-intro',
  template:`
    <section class="section-bg-white" id="children-youth">

      <div class="container">
        <app-section-title  #sectionTitleComponent></app-section-title>
        <div class="row">
          <div class="col-lg-6 left">
            <div class="wrap">

            </div>
            <app-carousel
              [images] = "images"
              [indicators]="false"
              [controls] = "false"
              [autoSlide] = true
              [slideInterval]=5000
              [boxShadow]= "'black'"
              [subTitleColor]="'white'"
            ></app-carousel>
          </div>
          <div class="col-lg-6 right">
            <div class="wrap">
              <app-right-intro-section #rightIntroSection>
                <p>  To enter into the Kingdom of God Jesus said we must become like children-pure,
                  full of wonder, trusting and teachable. They have much to teach us adults about
                  how our hearts need to be tender towards God. At Sunrise raising up children to love
                  Jesus and follow him is vital. We provide Sunday School, Vacation Bible School and youth events
                  and outings. Come grow with us in our vision to see families coming to Jesus with our young people
                  leading the way into the next generation for God's glory and Kingdom Come.
              </app-right-intro-section>
            </div>
          </div>
        </div>

      </div>
    </section>

  `,
  styles:[`
    .left{
      padding: 0;
    }
    .right{
      padding-left: 2rem;
    }
    .wrap{
      font-size: 1rem;
    }


    @media (max-width: 767px) {

      .left{
        margin-bottom: 1.5rem;
      }





    }

  `]
})
export class ChildrenYouthIntroComponent {


  @ViewChild('sectionTitleComponent') sectionTitleComponent!:SectionTitleComponent;
  @ViewChild('rightIntroSection') rightIntroSectionComponent!: RightIntroSectionComponent;
  // input으로 carousel 에 들어갈 slide info
  images:any[]= [
    {url: '/assets/children_youth/cy_6.jpg', title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_2.jpg', title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_3.jpg',  title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_4.jpg',  title: "imageTitle1", subTitle:"imageSubtitle is here for details"}
    ,{url: '/assets/children_youth/cy_5.jpg',  title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_1.jpg', title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_7.jpg', title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_8.jpg',  title: "imageTitle1", subTitle:"imageSubtitle is here for details"},
    {url: '/assets/children_youth/cy_9.jpg',  title: "imageTitle1", subTitle:"imageSubtitle is here for details"},

  ];

  ngAfterViewInit(){
    //section title control
    this.sectionTitleComponent.title.nativeElement.textContent = 'CHILDREN & YOUTH';
    this.sectionTitleComponent.subTitle.nativeElement.textContent = 'God\'s Special Ones';

    // right section title control
    this.rightIntroSectionComponent.span = "come";
    this.rightIntroSectionComponent.title = "Jesus said to the children to";
  }


}

