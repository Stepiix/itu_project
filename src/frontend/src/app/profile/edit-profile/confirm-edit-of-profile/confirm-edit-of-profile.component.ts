import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-confirm-edit-of-profile',
  templateUrl: './confirm-edit-of-profile.component.html',
  styleUrls: ['./confirm-edit-of-profile.component.css']
})
export class ConfirmEditOfProfileComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmEditOfProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
