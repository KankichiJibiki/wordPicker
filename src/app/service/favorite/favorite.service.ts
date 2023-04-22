import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConst } from 'src/app/constants/api-url';
import { Favorites } from 'src/app/model/favorites';
import { ToggleFavorite } from 'src/app/model/toggleFavorites';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  isClickable: boolean = false;
  favList = new Map<number, number>;

  constructor(
    private http: HttpClient,
  ) { }

  public toggleFav(favList: ToggleFavorite) : Observable<Response>
  {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_FAVORITE}`;

    return this.http.post<Response>(apiUrl, favList);
  }

  public createFavList(favObj: Favorites[]): void{
    this.favList.clear();
    for(let i = 0; i < favObj.length; i++){
      this.favList.set(favObj[i].wordId, favObj[i].id);
    }
    console.log(this.favList);
    this.isClickable = true;
  }
}
