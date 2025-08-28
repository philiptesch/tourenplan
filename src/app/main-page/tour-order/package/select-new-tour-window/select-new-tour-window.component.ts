import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-select-new-tour-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-new-tour-window.component.html',
  styleUrl: './select-new-tour-window.component.scss'
})
export class SelectNewTourWindowComponent {
time!: string
tourcode!: number;
article!: string

constructor(public dialogRef: MatDialogRef<SelectNewTourWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: { article: string; time: number, tourcode: number }) { 
   this.time = this.data.time.toString().padStart(2, '0') + ':00'; // z.B. 14 -> "14:00"
   this.article = this.data.article;
   this.tourcode = this.data.tourcode;
}



changeNewTour(event:Event) {
    event.preventDefault();
     const newTour = {
      time: this.time,
      tourcode: this.tourcode,
      article: this.article
    };
    this.dialogRef.close(newTour);

}
}
