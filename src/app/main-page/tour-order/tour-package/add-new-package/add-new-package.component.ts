import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-add-new-package',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-new-package.component.html',
  styleUrl: './add-new-package.component.scss'
})
export class AddNewPackageComponent {
time!: string
tourcode!: string;
article!: string
lkws = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,16,17,18,19,20];
  newTour = {
    time: '',
    tourcode: '',
    article: ''
  };
    id! : string

  constructor(private dialogRef: MatDialogRef<AddNewPackageComponent>) {}

  getId() {
    const newTime = Number(this.time.split(':')[0]);
    console.log(`drop-${this.tourcode}-${this.time}`);
     return `drop-${this.tourcode}-${newTime}`
  }

createTour(event: Event) {
  this.id = this.getId();
  event.preventDefault();
    this.dialogRef.close({
      time: this.time,
      tourcode: this.tourcode,
      article: this.article, 
      id: this.id
    });

}

}
