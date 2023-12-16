import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settledebt',
  templateUrl: './settledebt.component.html',
  styleUrls: ['./settledebt.component.css']
})
export class SettledebtComponent {

  constructor(private dialogRef: MatDialogRef<SettledebtComponent>) {}

  // Přidáme metodu pro zavření dialogu
  zavritDialog() {
    this.dialogRef.close();
  }
}
