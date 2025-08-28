import { Component, Input,inject, EventEmitter, Output  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SelectNewTourWindowComponent } from './select-new-tour-window/select-new-tour-window.component';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() article!: string;
  @Input() time!: number;
  @Input() tourcode!: number;
  readonly dialog = inject(MatDialog);
  @Output() newtourCreated = new EventEmitter<{time: string, tourcode: number, article: string}>();

  openDialog() {
    let dialogRef = this.dialog.open(SelectNewTourWindowComponent, {
      data: { article: this.article, time: this.time, tourcode:this.tourcode }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Neue Tour aus Dialog:', result);
      this.newtourCreated.emit(result)
    }
  });
  }
}
