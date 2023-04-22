import { UserList } from './../../model/user-list';
import { OverlayService } from './../../service/overlay/overlay.service';
import { SpinnerService } from './../../service/spinner/spinner.service';
import { DialogService } from './../../service/dialog/dialog.service';
import { WordSetService } from './../../service/word-set/word-set.service';
import { WordSet } from './../../model/word-set';
import { Component } from '@angular/core';
import { WordType } from 'src/app/model/word-type';
import { PageEvent } from '@angular/material/paginator';
import { DialogResult } from '../components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { lastValueFrom } from 'rxjs';
import { CreateValidatoins } from 'src/app/validations/login/create-validatoin';
import { LoginData } from 'src/app/model/login-data';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Favorites } from 'src/app/model/favorites';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  words: WordSet[] = [];
  user: LoginData[] | any = [];
  editWordSet = new WordSet();
  inputWordSet = new WordSet();
  userParams = new UserList();
  wordTypes: WordType[] = [];
  isEditMode: boolean = false;
  isTypeReady: boolean = false;
  editId?: number;
  wordForm: any;
  userId?: string | null;
  username?: string | null = "";

// table
  displayColumns: string[] = ['id', 'voca', 'definition', 'created_date', 'updated_date', 'typeId', 'edit', 'delete'];
  public pageSlice = this.words.slice(0, 11);

  constructor(
    private wService: WordSetService,
    private aService: AuthService,
    public fService: FavoriteService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private createWordV : CreateValidatoins,
  ){
    this.wordForm = this.createWordV.createWordForm;
  }


  ngOnInit(): void{
    this.getWordsList();
    this.getWordTypes();
    this.userId = localStorage.getItem('userId');
    this.username = localStorage.getItem('userName');
    if(this.userId != null) this.inputWordSet.userId = +this.userId;
    this.getUser(this.username);
  }

  public getUser(username: string | null) {
    if(username == null) return;
    this.userParams.username = username
    this.aService.getUser(this.userParams).subscribe({
      next: (res: Response | any) => {
        this.user = res.data;
        this.fService.createFavList(this.user.favorites);
      },
      complete: () => {

      }
    });
  }

  getWordsList(async: boolean = false){
    if(!async && !this.spinnerService.isLoading){
      this.spinnerService.start();
      this.overlayService.createOverlay();
    }
    this.userId = localStorage.getItem('userId');

    this.wService.getWordsList().subscribe({
      next: (res: Response | any) => {
        this.words = res.data;
        // Not pageSlice if this method being call by Fav
        if(!async)
          this.pageSlice = this.words.slice(0, 5);
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  getWordTypes(){
    this.wService.getTypes().subscribe({
      next: (res: Response | any) => {
        this.wordTypes = res.data;
        this.isTypeReady = true;
      },
    })
  }

  
  createWords(){
    this.spinnerService.start();
    this.overlayService.createOverlay();

    this.wService.createWord(this.inputWordSet).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this._clearInput();
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
        let msg = "Your word was successfully registered";
        this.dialogService.openYesOrNoDialog(msg, false);
      }
    });
  }

  editWord(i: number, edittedWord: WordSet){
    this.isEditMode = true;
    this.editId = i;
    this.editWordSet.id = edittedWord.id;
    this.editWordSet.voca = edittedWord.voca;
    this.editWordSet.definition = edittedWord.definition;
    this.editWordSet.typeId = edittedWord.typeId;
    let userId = localStorage.getItem('userId');
    if(userId != null) this.editWordSet.userId = +userId;
  };

  updateWord(){
    console.log(this.editWordSet);
    this.wService.updateWord(this.editWordSet).subscribe(
      (res : Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this.isEditMode = false;
      },
    );
  }

  disableEditMode(){
    this.isEditMode = false;
  }

  delete(word: WordSet){
    this.wService.deleteWordSet(word).subscribe({
      next: (res: Response | any) => {
        console.log(res.message);
        this.getWordsList();
        this.pageSlice = this.words.slice(0, 5);
      },
      complete: () => {
        this.spinnerService.stop();
      }
    })
  }

  async deleteWord(word: WordSet): Promise<void>{
    console.log(word);
    let msg = 'Are you sure to delete this word?';
    const dialogRef =  this.dialogService.openYesOrNoDialog(msg, true);

    let res: DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());

    console.log(res);
    if(res == DialogResult.No) return;

    this.spinnerService.start();

    let resDelete = this.delete(word);
  }

  pickup(){
    let userId = localStorage.getItem('userId');
    if(userId == null) {
      alert('You are not authorized');
      return;
    };
    
    this.spinnerService.start();
    this.overlayService.createOverlay();
    this.wService.slotWord(+userId).subscribe({
      next: (res: Response | any) => {
        console.log(res);
        this.dialogService.openSlotDialog(res.data);
      },
      complete: () => {
        this.spinnerService.stop();
        this.overlayService.disposeOverlay();
      }
    })
  }

  OnPageChange(event: PageEvent){
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.words.length) endIndex = this.words.length;

    this.pageSlice = this.words.slice(startIndex, endIndex);
  }

  private _clearInput(){
    this.inputWordSet.voca = '';
    this.inputWordSet.definition = '';
    this.inputWordSet.typeId = {} as number;
  }
}
