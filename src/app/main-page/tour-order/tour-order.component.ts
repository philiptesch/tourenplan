import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Timeslot } from '../../services/timeslot_model';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { PackageComponent } from './package/package.component';

@Component({
  selector: 'app-tour-order',
  standalone: true,
  imports: [CommonModule, DragDropModule, TourPackageComponent, PackageComponent],
  templateUrl: './tour-order.component.html',
  styleUrl: './tour-order.component.scss'
})
export class TourOrderComponent {
hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
lkws = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,16,17,18,19,20];
 newTour = {
    time: '',
    tourcode: '',
    article: ''
  };


  tours: Array<{time: number, tourcode: number, article: string}> = [];

onTourCreated(tour: {time: string, tourcode: number, article: string}) {
  const hour = Number(tour.time.split(':')[0]);
  const tourcodeNum = Number(tour.tourcode); // z.B. "13:00" -> 13
  this.tours.push({ 
    time: hour, 
    tourcode: tourcodeNum, 
    article: tour.article 
  });
  console.log("Neue Tour erstellt:", tour);
  // Optional: direkt anzeigen oder vorbereiten
}
showNewTour(lkw: number, hour: number) {
  return this.tours.filter(t => t.tourcode === lkw && t.time === hour);
}
  



}
