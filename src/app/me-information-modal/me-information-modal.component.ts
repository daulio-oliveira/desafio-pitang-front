import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-me-information-modal',
  templateUrl: './me-information-modal.component.html',
  styleUrls: ['./me-information-modal.component.css']
})
export class MeInformationModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MeInformationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.getMe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMe(){
    this.authService.me().subscribe(res=>{
      this.data = res;
    })
  }

}
