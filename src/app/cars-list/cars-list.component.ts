import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CarService } from '../service/car.service';
import { CarCreateModalComponent } from '../car-create-modal/car-create-modal.component';
import { CarEditModalComponent } from '../car-edit-modal/car-edit-modal.component';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'model', 'color', 'year', 'licenseplate', 'use', 'actions'];

  cars: any[];
  dataSource: any;
  id: number;

  isLoggedIn$!: Observable<boolean>;

  constructor(
    private carService: CarService,
    private loginService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.loginService.isLoggedIn;
    if(!this.isLoggedIn$) {
      this.router.navigate(['login'])
    }
    this.getAll();
  }

  openRegisterForm(){
    const dialogRef = this.dialog.open(CarCreateModalComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  openCarEditForm(car: any) {
    const dialogRef = this.dialog.open(CarEditModalComponent, {
      width: '600px',
      data: car
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
    
  }


  getAll() {
    this.cars = [];
    this.carService.getCars().subscribe(
      data => {
        this.cars = data;
        this.dataSource = new MatTableDataSource(this.cars);
      },
      err => {
        this.snackBar.open(err.error, 'Close', {
          duration: 2000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  deleteCar(car) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: `Confirm car deletion?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carService.delete(car.id).subscribe(
          res=>{
            this.snackBar.open('Car deleted successfully!', 'Close', {
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
        this.carService.getById(this.id).subscribe(
          res => {
            this.cars = [];
            this.cars.push(res);
            this.dataSource = new MatTableDataSource(this.cars);
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
      }else{
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
