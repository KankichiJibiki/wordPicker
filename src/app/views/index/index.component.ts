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
  editId?: number;

// table
  displayColumns: string[] = ['id', 'voca', 'definition', 'created_date', 'updated_date', 'typeId', 'edit', 'delete'];
  public pageSlice = this.words.slice(0, 11);

  constructor(
    private wService: WordSetService,
    private dialogService: DialogService,
    public spinnerService: SpinnerService
  ){}

  ngOnInit(): void{
    this.spinnerService.start();
    this.getWordsList();
    this.getWordTypes();
    let userId = localStorage.getItem('userId');
    if(userId != null) this.inputWordSet.userId = +userId;
  }
  
  getWordsList(){
     this.wService.getWordsList().subscribe(
        (res: WordSet[]) => {
          this.words = res;
          this.pageSlice = this.words.slice(0, 5);
          this.spinnerService.stop();
        },
      );
    }

  getWordTypes(){
    this.wService.getTypes().subscribe(
      (res: WordType[]) => {
        console.log(res);
        this.wordTypes = res;
      },
    )
  }

  
  createWords(){
    this.wService.createWord(this.inputWordSet).subscribe(
      (res: WordSet) => {
        alert('success');
        this.getWordsList();
        this._clearInput();
      },
      )
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
      (res : WordSet) => {
        this.getWordsList();
        this.isEditMode = false;
      },
    );
  }

  disableEditMode(){
    this.isEditMode = false;
  }

  delete(word: WordSet){
    this.wService.deleteWordSet(word).subscribe(
      (res: WordSet[]) => {
        console.log("delete success")
        this.words = res;
      },
    )
  }

  async deleteWord(word: WordSet): Promise<void>{
    console.log(word);
    let msg = 'Are you sure to delete this word?';
    const dialogRef =  this.dialogService.openYesOrNoDialog(msg);

    let res: DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());

    console.log(res);
    if(res == DialogResult.No) return;

    this.spinnerService.start();

    let resDelete = this.delete(word);

    this.spinnerService.stop();
  }

  slot(){
    let userId = localStorage.getItem('userId');
    if(userId == null) {
      alert('You are not authorized');
      return;
    };

    this.wService.slotWord(+userId).subscribe(
      (res: WordSet[]) => {
        console.log(res);
        this.dialogService.openSlotDialog(res);
      },
    )
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
