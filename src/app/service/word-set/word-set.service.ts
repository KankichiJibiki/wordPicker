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

  public getWordsList(): Observable<WordSet[]> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_GETALL}`;

    return this.http.get<WordSet[]>(apiUrl);
  }

  public createWord(newWord: WordSet): Observable<WordSet> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_CREATE}`;

    return this.http.post<WordSet>
    (apiUrl, newWord);
  }

  public updateWord(update: WordSet): Observable<WordSet> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_UPDATE}`;

    return this.http.put<WordSet>(apiUrl, update);
  }

  public deleteWordSet(wordSet: WordSet): Observable<WordSet[]> {
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_DELETE}/${wordSet.id}`;

    return this.http.delete<WordSet[]>(apiUrl);
  }

  public getTypes(): Observable<WordType[]>{
    let apiUrl = `${environment.apiUrl}/${apiConst.TYPE_URL}/${apiConst.TYPE_ACTION_URL_GET}`;

    return this.http.get<WordType[]>(apiUrl);
  }

  public slotWord(userId: number): Observable<WordSet[]>{
    let apiUrl = `${environment.apiUrl}/${apiConst.WORD_URL}/${apiConst.WORD_ACTION_URL_SLOT}/${userId}`;

    return this.http.get<WordSet[]>(apiUrl)
  }
}
