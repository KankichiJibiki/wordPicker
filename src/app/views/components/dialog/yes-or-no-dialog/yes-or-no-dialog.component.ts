import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-yes-or-no-dialog',
  templateUrl: './yes-or-no-dialog.component.html',
  styleUrls: ['./yes-or-no-dialog.component.css']
})
export class YesOrNoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<YesOrNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ){}

  yesClick(): void{
    this.dialogRef.close(DialogResult.Yes);
  }

  noClick(): void{
    this.dialogRef.close(DialogResult.No);
  }
}

export enum DialogResult {
  No,
  Yes,
}

export enum DialogType {
  Dialog,
  Confirm
}
