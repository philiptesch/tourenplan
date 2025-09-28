import { Component, Inject, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../../../interfaces/article.interface'
import { Tour } from '../../../../interfaces/tour.interface';

@Component({
  selector: 'app-tour-view',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './tour-view.component.html',
  styleUrl: './tour-view.component.scss'
})
export class TourViewComponent implements OnInit {
@Input() tour!: Tour;
@Output() close = new EventEmitter<void>();
totalWeight: number = 0
tourBeginTime!: String
tourEndTime!: String
  constructor() {
  }

  ngOnInit(): void {
  this.calculateTotalWeight();
  this.representTime();
    
  }

    onClose() {
    this.close.emit();
  }


  calculateTotalWeight() {
    this.tour.article.forEach(art => {
      this.totalWeight += art.weight
    });

    console.log('this.totalWeight',this.totalWeight);
  }


    
    representTime() {
    const beginHour = this.tour.time.toFixed(2)
    const beginHourFormatted = beginHour.replace('.', ':');
    this.tourBeginTime =  beginHourFormatted.toString()
  
    const calculateEndHour = this.tour.time + 1
    const endHour  = calculateEndHour.toFixed(2)
    const endHourFormatted = endHour.replace('.', ':');
    this.tourEndTime =  endHourFormatted.toString() 


    }


}
