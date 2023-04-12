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

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  words: WordSet[] = [];
  editWordSet = new WordSet();
  inputWordSet = new WordSet();
  wordTypes: WordType[] = [];
  isEditMode: boolean = false;
  isTypeReady: boolean = false;
  editId?: number;

// table
  displayColumns: string[] = ['id', 'voca', 'definition', 'created_date', 'updated_date', 'typeId', 'edit', 'delete'];
  public pageSlice = this.words.slice(0, 11);

  constructor(
    private wService: WordSetService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
  ){}

  ngOnInit(): void{
    this.getWordsList();
    this.getWordTypes();
    let userId = localStorage.getItem('userId');
    if(userId != null) this.inputWordSet.userId = +userId;
  }
  
  getWordsList(){
    if(!this.spinnerService.isLoading){
      this.spinnerService.start();
      this.overlayService.createOverlay();
    }

    this.wService.getWordsList().subscribe({
      next: (res: Response | any) => {
        console.log(res);
        this.spinnerService.start();
        this.words = res.data;
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
        console.log(res);
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
