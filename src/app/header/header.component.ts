import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  template: `

    <nav #navBar class="navbar navbar-expand-lg navbar-dark  fixed-top padding"
         [ngStyle]="{'background': isAtTop && toggleBtnNotActive ? 'rgba(0,0,0,0.9)':'rgba(0,0,0,0.9)' }">
      <!--  transparent only when isAtTop , toggleBtnNotActive both true-->
      <div class="container-fluid padding-0">
        <a routerLink="/"
           class="navbar-brand" href="#"><img src="assets/logo_gmc.png" alt=""><b>&nbsp; <span #ChangingWord></span></b></a>
        <button #navBarToggler (click)="toggleBtnClick($event)"
                class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
          <i class="fas fa-bars"></i>
        </button>


        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" #navBarContent>
          <ul class="navbar-nav mb-lg-0">
            <li class="nav-item">
              <a routerLinkActive="router-active" routerLink="/visitorsInfo" class="nav-link active"
                 aria-current="page">Visitor Info</a>
            </li>
            <li class="nav-item">
              <a routerLinkActive="router-active" routerLink="/childrenYouth" class="nav-link active"
                 aria-current="page">Children & Youth</a>
            </li>
            <!--          <li class="nav-item">-->
            <!--            <a routerLinkActive="router-active" routerLink="/ministries" class="nav-link active" aria-current="page" >Ministries</a>-->
            <!--          </li>-->
            <li class="nav-item">
              <a routerLinkActive="router-active" routerLink="/newsActivities" class="nav-link active"
                 aria-current="page">News& Activities</a>
            </li>

          </ul>
        </div>
      </div>
    </nav>


    <style>
    </style>


  `,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgStyle
  ],
  styles: [`
    .padding-0 {
      padding: 0;
    }

    collapse.show {
      transition: height 0.3s ease;
    }

    a.navbar-brand {
      font-size: 25px;
    }

    .nav-item > a {
      padding: 0.8rem 0.8rem;
      font-size: 20px;
      transition: color 0.5s ease-in-out, background-color 0.5s ease-in-out;
    }

    .navbar-brand > img {
      height: 55px;
    }

    .nav-link {
      font-weight: bold;
    }

    .nav-item > a:hover {
      border-radius: 5px;
      background-color: azure;
      color: black;
      cursor: pointer;
    }

    .navbar-brand {
      padding-left: 1rem;
    }

    .navbar-toggler {
      border: none; /* border 제거 */
    }

    .navbar-toggler {
      outline: none; /* 클릭 시 포커스 아웃라인 제거 */
      box-shadow: none; /* 클릭 시 박스 쉐도우 제거 */
    }

    .navbar-toggler:not(:focus) {
      box-shadow: none; /* 포커스가 아닐 때 박스 쉐도우 제거 */
    }

    .nav-item {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }

    /*.navbar{*/
    /*  background: rgba(0,0,0,0.4);*/
    /*}*/


    .padding {
      padding: 0;
    }

    @keyFrames blink {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }


    .transparent {
      background: transparent;
    }

  `]
})
export class HeaderComponent implements AfterViewInit{
  constructor(private renderer:Renderer2) {
  }

  isAtTop!: boolean;
  toggleBtnNotActive!: boolean;

  @ViewChild('navBarContent') navBarContent!: ElementRef;
  @ViewChild('navBarToggler') navBarToggler!: ElementRef;

  // 화면 어디든 클릭 시 navbar collapse toogle버튼이 클릭되게 해서 닫히는
  //animation이 나오게 만듦
    handleCustomEvent(){ // appComponent에서 ViewChild로 사용
     if(this.navBarToggler.nativeElement && !this.navBarToggler.nativeElement.classList.contains('collapsed')) {
      this.navBarToggler.nativeElement.click();
    }

    }

    toggleBtnClick(event: Event){
      event.stopPropagation();
      console.log(this.isAtTop);
       this.isAtTop = !this.isAtTop;
      this.toggleBtnNotActive = !this.toggleBtnNotActive;
    }

    ngOnInit(){
      this.isAtTop= true;
      this.toggleBtnNotActive= true;
      // window.addEventListener('scroll', this.handleScroll);

    }

  ngAfterViewInit(): void {
  }

private handleScroll = ()=>{
      const scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop || document.body.scrollTop || 0;

      this.isAtTop  = scrollTop === 0;
}

}
