import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "../routeGuard/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template:`
    <div class="dummy"></div>

    <section>
      <div class="container">
        <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm.value)">
          <div class="mb-3">
            <label for="id" class="form-label">ID</label>
            <input type="text" class="form-control" id="id" name="id" aria-describedby="idHelp" [(ngModel)]="id">
            <div id="idHelp" class="form-text">Only Activated Admin Credential can access</div>
          </div>
          <div class="mb-3">
            <label for="pw" class="form-label">Password</label>
            <input type="password" class="form-control" id="pw" name="pw" [(ngModel)]="pw">
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="!loginForm.valid">Login</button>
        </form>
      </div>
    </section>


    <style>
      .dummy{
        width: 100%;
        height: 300px;
      }
    </style>

  `,
  styles:[`

  `]
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
