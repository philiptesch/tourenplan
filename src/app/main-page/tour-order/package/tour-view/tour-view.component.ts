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
export class TourViewComponent {
@Input() tour!: Tour;
@Output() close = new EventEmitter<void>();

  constructor() {
  }



    onClose() {
    this.close.emit();
  }
}
