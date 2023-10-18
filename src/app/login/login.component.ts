import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "../routeGuard/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
      id:string= '';
      pw:string  = '';
  protected readonly onsubmit = onsubmit;

  constructor(private authService:AuthServiceService,private router:Router) {
  }

  @ViewChild('loginForm') loginForm!: NgForm;
  onSubmit(form:{id:string,pw:string}){
    console.log(form);
    if(form.id === 'sunriseadmin1324' && form.pw === 'Qwdf3696!'){
      this.authService.login();
      console.log("Authenticated?"+this.authService.isAuthenticated());
      this.router.navigate(['/controlPanel']);
    }else{
      alert("Id & PW not matching");
    }
  }
}
