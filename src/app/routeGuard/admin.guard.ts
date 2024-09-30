import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  constructor(private authService:AuthServiceService, private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // for developer mode, return false for auto login to admin panel

    return true;

    if(this.authService.isAuthenticated()){
      console.log("it is authenticated user");
      return true;
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
