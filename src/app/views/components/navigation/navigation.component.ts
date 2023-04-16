import { AuthService } from './../../../service/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    public authService: AuthService,
  ){}

  public logout(){
    this.authService.logout();
  }
}
