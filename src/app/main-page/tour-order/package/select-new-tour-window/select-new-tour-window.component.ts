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
id!: string
constructor(public dialogRef: MatDialogRef<SelectNewTourWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: { article: string; time: number, tourcode: number, oldid:string }) { 
   this.time = this.data.time.toString().padStart(2, '0') + ':00'; // z.B. 14 -> "14:00"
   this.article = this.data.article;
   this.tourcode = this.data.tourcode;
}


getnewId(){
    console.log(`drop-${this.tourcode}-${this.time}`);
    const newTime = Number(this.time.split(':')[0]);
     return `drop-${this.tourcode}-${newTime}`
}



changeNewTour(event:Event) {
    this.id = this.getnewId();
    this.dialogRef.close(  {
      time: this.time,
      tourcode: this.tourcode,
      article: this.article,
      id: this.id,
      oldId: this.data.oldid
    });

}
}
