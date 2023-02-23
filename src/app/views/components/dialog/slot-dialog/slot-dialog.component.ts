import { WordSet } from './../../../../model/word-set';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-slot-dialog',
  templateUrl: './slot-dialog.component.html',
  styleUrls: ['./slot-dialog.component.css']
})
export class SlotDialogComponent {
  panelOpenState = false;
  
  constructor(
    public dialogRef: MatDialogRef<SlotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WordSet[],
  ){
    console.log(data);
  }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
