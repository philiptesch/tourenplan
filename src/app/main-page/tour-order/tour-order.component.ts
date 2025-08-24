import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timeslot } from '../../services/timeslot_model';


@Component({
  selector: 'app-tour-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-order.component.html',
  styleUrl: './tour-order.component.scss'
})
export class TourOrderComponent {
hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
lkws = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,16,17,18,19,20];
}
