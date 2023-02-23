import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading: boolean = false;

  constructor() { }

  public start(){
    this.isLoading = true;
  }

  public stop(){
    this.isLoading = false;
  }
}
