import { Component, Input,inject, EventEmitter, Output  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SelectNewTourWindowComponent } from './select-new-tour-window/select-new-tour-window.component';
import {Article} from '../../../interfaces/article.interface'

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() article!: Article;
  @Input() time!: Number;
  @Input() tourcode!: number;
  oldid! : string
  readonly dialog = inject(MatDialog);
  @Output() newtourCreated = new EventEmitter<{time: string, tourcode: number, article: Article[],id:string, oldId:string, firestoreId:string}>();

  openDialog() {
    this.oldid = this.getId();
    let dialogRef = this.dialog.open(SelectNewTourWindowComponent, {
      data: { article: this.article, time: this.time, tourcode:this.tourcode, oldid: this.oldid   }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('neuererwer:', result);
      this.newtourCreated.emit(result)
    }
  });
  }


  getId() {
    console.log(`drop-${this.tourcode}-${this.time}`);
     return `drop-${this.tourcode}-${this.time}`
  }
}
