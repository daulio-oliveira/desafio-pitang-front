import {OnInit, Component, ViewChild} from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../domains/user.domain';
import { MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateModalComponent } from '../user-create-modal/user-create-modal.component';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'birthday', 'login', 'phone', 'createAt', 'actions'];
  users: any[] = [];

  dataSource: any;

  id:any;


  constructor(private userService: UserService, 
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }


  openRegisterForm() {
    const dialogRef = this.dialog.open(UserCreateModalComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
    
  }

  openUserEditForm(user: any) {
    const dialogRef = this.dialog.open(UserEditModalComponent, {
      width: '600px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
    
  }

  getAll() {
    this.users = [];
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.dataSource)
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

  deleteUser(user) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Confirm user deletion?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user.id).subscribe(
          res=>{
            this.snackBar.open('User deleted successfully!', 'Close', {
              duration: 2000,
              verticalPosition: 'top',
              panelClass: ['warning-snackbar']
            });
            this.getAll();
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
        )
      } 
    });
  }

  performSearch() {
    if(this.id !== undefined){
      if(!isNaN(this.id)){
        this.userService.getById(this.id).subscribe(
          res => {
            this.users = [];
            this.users.push(res);
            this.dataSource = new MatTableDataSource(this.users);
            this.id = undefined;
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
        )
      } else {
        this.snackBar.open('Invalid ID. Enter numbers only.', 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
      
    }else{
      this.getAll();
    }
  }
}
