import { SpinnerService } from './service/spinner/spinner.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public spinnerService: SpinnerService
  ){}

  title = 'Word_picker_app';
}
