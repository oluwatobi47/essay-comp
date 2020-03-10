/**
 * Created by alao on 3/10/2020.
 */
import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs/index";
import {AuthService} from "../../shared/services/auth.service";
import {LoginComponent} from "../../login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  openComponentPages = [LoginComponent];

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isPublicComponent = this.openComponentPages.find(o => o == route.component);
    if (this.authService.isAuthenticated()) {
      if (isPublicComponent) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    } else if (!isPublicComponent) {
      this.router.navigate(['/sign-in']);
      return false;
    }
    return true;
  }
}
