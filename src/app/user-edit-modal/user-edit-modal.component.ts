import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  userForm = this.fb.group({
    id: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthday: ['', Validators.required],
    email: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) {     
  }

  ngOnInit(): void {
    this.setFields();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.getFields();
        this.userService.update(this.data).subscribe(
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

  onClose() {
    this.dialogRef.close();
  }

  getFields() {
    this.data.firstName = this.userForm.value.firstname;
    this.data.lastName = this.userForm.value.lastname;
    this.data.birthday = this.userForm.value.birthday;
    this.data.email = this.userForm.value.email;
    this.data.login = this.userForm.value.login;
    this.data.password = this.userForm.value.password;
    this.data.phone = this.userForm.value.phone;
    this.data.cars = [];
  }

  setFields() {
    this.userForm = this.fb.group({
      id: [{value: this.data.id, disabled: true}],
      firstname: [this.data.firstName],
      lastname: [this.data.lastName],
      birthday: [this.data.birthday],
      email: [this.data.email],
      phone: [this.data.phone],
      login: [this.data.login],
      password: [this.data.password]
    });
  }


}
