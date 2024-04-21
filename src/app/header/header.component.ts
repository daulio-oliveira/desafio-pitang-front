import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MeInformationModalComponent } from '../me-information-modal/me-information-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  nameUserIn$!: Observable<string>;

  constructor(
    private loginService: AuthService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    this.nameUserIn$ = this.loginService.getNameUserIn;
  }

  login(){
    this.router.navigate(['login']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

  openMyInformations() {
    this.dialog.open(MeInformationModalComponent, {
      width: '300px'
    });
  }


}
