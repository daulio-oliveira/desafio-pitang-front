import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from '../service/car.service';

@Component({
  selector: 'app-car-edit-modal',
  templateUrl: './car-edit-modal.component.html',
  styleUrls: ['./car-edit-modal.component.css']
})
export class CarEditModalComponent implements OnInit {

  carForm = this.fb.group({
    id: ['', Validators.required],
    model: ['', Validators.required],
    color: ['', Validators.required],
    year: ['', Validators.required],
    licenseplate: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CarEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarService,
    private snackBar: MatSnackBar,) {     
  }

  ngOnInit(): void {
    this.setFields();
  }

  onSubmit() {
    if (this.carForm.valid) {
      this.getFields();
        this.carService.update(this.data).subscribe(
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
    this.data.model = this.carForm.value.model;
    this.data.color = this.carForm.value.color;
    this.data.year = this.carForm.value.year;
    this.data.licensePlate = this.carForm.value.licenseplate;
  }

  setFields() {
    this.carForm = this.fb.group({
      id: [{value: this.data.id, disabled: true}],
      model: [this.data.model],
      color: [this.data.color],
      year: [this.data.year],
      licenseplate: [this.data.licensePlate]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
