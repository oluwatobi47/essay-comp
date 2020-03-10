import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-authenticated-view',
  templateUrl: './authenticated-view.component.html',
  styleUrls: ['./authenticated-view.component.scss']
})
export class AuthenticatedViewComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    //destroy token
    //clear applicationContext and route to login page
    this.authService.clearSessionData();
    this.router.navigate(['/sign-in']);
  }

}
