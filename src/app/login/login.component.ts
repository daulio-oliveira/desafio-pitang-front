import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  user: any;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      res =>{
        this.user = res;
        this.router.navigate(['cars-list'])
      },
      err =>{
        var errormessage = 'Sorry, an unexpected error occurred. Please try again later.';
        if(err.status == 500){
          errormessage = err.error;
        }
        this.snackBar.open(errormessage, 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    )
  }

}
