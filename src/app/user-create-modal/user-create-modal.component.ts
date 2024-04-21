import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create-modal',
  templateUrl: './user-create-modal.component.html',
  styleUrls: ['./user-create-modal.component.css']
})
export class UserCreateModalComponent implements OnInit {

  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthday: ['', Validators.required],
    email: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
  });

  user: any = {};

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateModalComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,) {     
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
        this.getFields();
        this.userService.save(this.user).subscribe(
          res => {
            this.snackBar.open('User saved successfully!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['warning-snackbar']
            });
            this.dialogRef.close();
          },
          err => {
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
        );
    }
  }


  getFields(): void {
    this.user.firstName = this.registerForm.value.firstname;
    this.user.lastName = this.registerForm.value.lastname;
    this.user.birthday = this.registerForm.value.birthday;
    this.user.email = this.registerForm.value.email;
    this.user.login = this.registerForm.value.login;
    this.user.password = this.registerForm.value.password;
    this.user.phone = this.registerForm.value.phone;
    this.user.cars = [];
  }

  onClose() {
    this.dialogRef.close();
  }

}
