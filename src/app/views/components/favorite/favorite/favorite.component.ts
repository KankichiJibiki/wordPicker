import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginData } from 'src/app/model/login-data';
import { ToggleFavorite } from 'src/app/model/toggleFavorites';
import { UserList } from 'src/app/model/user-list';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  favList?: ToggleFavorite;
  username?: string | null = "";
  userParams = new UserList();
  user: LoginData[] | any = [];

  constructor(
    public fService: FavoriteService,
    public aService: AuthService,
  ){
    let username = localStorage.getItem('userName');
    if(username != null)
      this.userParams.username = username;
  }
  
  userId?: string | null;
  @Input() isFav?: boolean;
  @Input() id?: number;
  @Input() wordId?: number;
  @Output() wordEmitter: EventEmitter<boolean> = new EventEmitter();

  public good(event: any)
  {
    if(!this.fService.isClickable) return;

    this._setFavoriteList();
    console.log(this.favList);
    this.isFav = !this.isFav;

    if(this.favList == null) return;
    this.fService.toggleFav(this.favList).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.getUser();
      },
      error: (error : any) => {

      },
      complete: () => {

      }
    })
  }

  public getUser() {
    this.aService.getUser(this.userParams).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.user = res.data;
        this.fService.createFavList(this.user.favorites);
        this._getWordsList(true);
      },
      complete: () => {

      }
    });
  }

  private _getWordsList(async: boolean)
  {
    console.log("Emitter works")
    this.wordEmitter.emit(async);
  }

  private _setFavoriteList()
  {
    this.userId = localStorage.getItem("userId");
    if(
      this.wordId != undefined && 
      this.isFav != undefined && 
      this.userId != undefined
    )
    {
      this.favList = {
        id : null,
        userId : +this.userId,
        wordId : this.wordId,
        isFav : this.isFav,
      }
    }
    if(this.id != undefined)
      this.favList!.id = this.id;
  }
}
