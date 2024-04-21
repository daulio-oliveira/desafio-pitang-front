import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-car-create-modal',
  templateUrl: './car-create-modal.component.html',
  styleUrls: ['./car-create-modal.component.css']
})
export class CarCreateModalComponent implements OnInit {

  registerForm = this.fb.group({
    model: ['', Validators.required],
    color: ['', Validators.required],
    year: ['', Validators.required],
    licenseplate: ['', Validators.required]
  });

  car: any = {}


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarCreateModalComponent>,
    private carService: CarService,
    private snackBar: MatSnackBar,) {     
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.getFields();
        this.carService.save(this.car).subscribe(
          res => {
            this.snackBar.open('Car saved successfully!', 'Close', {
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
    this.car.model = this.registerForm.value.model;
    this.car.color = this.registerForm.value.color;
    this.car.year = this.registerForm.value.year;
    this.car.licensePlate = this.registerForm.value.licenseplate;
  }

  onClose() {
    this.dialogRef.close();
  }

}
