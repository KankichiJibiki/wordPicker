import { SpinnerService } from './../../../../service/spinner/spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {
  constructor(
    public spinnerService: SpinnerService
  ){}
}
