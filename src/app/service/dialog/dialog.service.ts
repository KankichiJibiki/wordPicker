import { DialogResult, YesOrNoDialogComponent } from './../../views/components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { ErrorDialogComponent } from './../../views/components/dialog/error-dialog/error-dialog.component';
import { WordSet } from './../../model/word-set';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SlotDialogComponent } from 'src/app/views/components/dialog/slot-dialog/slot-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
  ) { }

  public openSlotDialog(wordSet: WordSet[]): void{
    this.dialog.open(SlotDialogComponent, {
      data: wordSet,
    });
  }

  public openErrDialog( errMsg: string): MatDialogRef<ErrorDialogComponent, DialogResult>{
    return this.dialog.open(ErrorDialogComponent, {
      data: errMsg ,
    });
  }

  public openYesOrNoDialog(msg: string, type: boolean)
    : MatDialogRef<YesOrNoDialogComponent, DialogResult>
  {
    return this.dialog.open(YesOrNoDialogComponent, {
      data: [msg, type],
    });
  }
}



