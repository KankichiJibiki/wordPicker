import { environment } from '../../../environments/environment';
import { WordSet } from '../../model/word-set';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConst } from 'src/app/constants/api-url';
import { WordType } from 'src/app/model/word-type';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {

  constructor(private http: HttpClient) { }

  public getWordsList(): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_GETALL}`;

    return this.http.get<Response>(apiUrl);
  }

  public createWord(newWord: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_CREATE}`;

    return this.http.post<Response>
    (apiUrl, newWord);
  }

  public updateWord(update: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_UPDATE}`;

    return this.http.put<Response>(apiUrl, update);
  }

  public deleteWordSet(wordSet: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_DELETE}`;

    return this.http.put<Response>(apiUrl,wordSet);
  }

  public getTypes(): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${apiConst.TYPE_URL}/${apiConst.TYPE_ACTION_URL_GET}`;

    return this.http.get<Response>(apiUrl);
  }

  public slotWord(userId: number): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_SLOT}`;

    return this.http.get<Response>(apiUrl)
  }
}
