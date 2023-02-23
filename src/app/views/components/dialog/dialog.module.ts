import { YesOrNoDialogComponent } from './yes-or-no-dialog/yes-or-no-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { SlotDialogComponent } from 'src/app/views/components/dialog/slot-dialog/slot-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [
    SlotDialogComponent,
    ErrorDialogComponent,
    YesOrNoDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
  ]
})
export class DialogModule { }
