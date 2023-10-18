import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
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
