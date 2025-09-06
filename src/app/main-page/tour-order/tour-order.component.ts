import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { PackageComponent } from './package/package.component';
import {MatIconModule} from '@angular/material/icon';
import {Article} from '../../interfaces/article.interface'
@Component({
  selector: 'app-tour-order',
  standalone: true,
  imports: [CommonModule, DragDropModule, TourPackageComponent, PackageComponent, MatIconModule],
  templateUrl: './tour-order.component.html',
  styleUrl: './tour-order.component.scss'
})
export class TourOrderComponent {
  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  lkws = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20];
  article!:Article

  tours: Array<{ time: number; tourcode: number; article: string, id:string }> = [];

  // DropLists verbinden
  allDropLists: string[] = [];

  ngOnInit() {
    for (let lkw of this.lkws) {
      for (let hour of this.hours) {
        this.allDropLists.push(this.getDropListId(lkw, hour));
        
      }
    }
  }

  getDropListId(lkw: number, hour: number) {
    
    return `drop-${lkw}-${hour}`;
  }
onTourCreated(tour: { time: string; tourcode: number; article: any, id: string, oldId:string }) {
  const hour = Number(tour.time.split(':')[0]);
  const tourcodeNum = Number(tour.tourcode);
  this.article = tour.article
  const index = this.tours.findIndex(t => t.id === tour.oldId);

  if (index !== -1) {
    this.tours[index] = {
      time: hour,
      tourcode: tourcodeNum,
      article: tour.article,
      id: tour.id
    };
    console.log('Paket aktualisiert:', this.tours[index]);
  } else {
    this.tours.push({
      time: hour,
      tourcode: tourcodeNum,
      article: tour.article,
      id: tour.id
    });
    console.log('Neues Paket hinzugefügt:', this.tours[this.tours.length-1]);
  }
}

  showNewTour(lkw: number, hour: number) {
    return this.tours.filter(t => t.tourcode === lkw && t.time === hour);
  }

  drop(event: CdkDragDrop<any[]>, newLkw: number, newHour: number) {
    if (event.previousContainer !== event.container) {
      const tour = event.previousContainer.data[event.previousIndex];

      // neue Position setzen
      tour.tourcode = newLkw;
      tour.time = newHour;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
