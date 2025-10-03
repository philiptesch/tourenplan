import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { TourPackageComponent } from './tour-package/tour-package.component';
import { PackageComponent } from './package/package.component';
import {MatIconModule} from '@angular/material/icon';
import {Article} from '../../interfaces/article.interface'
import { FirestoreServiceService } from '../../services/firestore-service.service';
import { Tour } from '../../interfaces/tour.interface';
import { customer } from '../../interfaces/customer.interface';
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
  customerList: customer[] = []

  tours: Tour[] = []
  touren: Tour[] = []
  // DropLists verbinden
  allDropLists: string[] = [];


  constructor(private firestoreService: FirestoreServiceService) {

  }

async  ngOnInit() {
await  this.loadTourList();
await  this.loadCustolerlist();

    for (let lkw of this.lkws) {
      for (let hour of this.hours) {
        this.allDropLists.push(this.getDropListId(lkw, hour));
      }
    }
  }


loadTourList() {
  this.firestoreService.tourObersavble$.subscribe(tours => {
    this.touren = tours;
    console.log('this.touren', this.touren);

    for (let tour of this.touren) {
      let time = String(tour.time)
      this.onTourCreated({
        tourcode: tour.tourcode,
        time: time,
        article: tour.article,
        id: tour.id,
        oldId: tour.id,
        firestoreId: tour.firestoreId
      });
    }
  });
}



loadCustolerlist() {
  this.firestoreService.customerObersavble$.subscribe(customer => {
    this.customerList = customer
    console.log('this.customerList',this.customerList);
    

  })
}


  getDropListId(lkw: number, hour: number) {
    
    return `drop-${lkw}-${hour}`;
  }
onTourCreated(tour: { time: string; tourcode: number; article: any, id: string, oldId:string, firestoreId:string }) {
  const hour = Number(tour.time.split(':')[0]);
  const tourcodeNum = Number(tour.tourcode);
  this.article = tour.article
  const index = this.tours.findIndex(t => t.id === tour.oldId);

  if (index !== -1) {
    this.tours[index] = {
      time: hour,
      tourcode: tourcodeNum,
      article: tour.article,
      id: tour.id,
      firestoreId: tour.firestoreId
    };
    console.log('Paket aktualisiert:', this.tours[index]);
  } else {
    this.tours.push({
      time: hour,
      tourcode: tourcodeNum,
      article: tour.article,
      id: tour.id,
      firestoreId: tour.firestoreId
    });
    console.log('Neues Paket hinzugefügt:', this.tours[this.tours.length-1]);
  }
}

  showNewTour(lkw: number, hour: number) {
    return this.tours.filter(t => t.tourcode === lkw && t.time === hour);
  }

  drop(event: CdkDragDrop<any[]>, newLkw: number, newHour: number) {
    if (event.previousContainer !== event.container) {

      if (!this.checkTourIsAlreadyPresent(newLkw,newHour)) {
        
      
        
      
      
      const tour = event.previousContainer.data[event.previousIndex];

      // neue Position setzen
      tour.tourcode = newLkw;
      tour.time = newHour;
      tour.id = this.getDropListId(newLkw,newHour )
      let newTour = event.container.data
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.firestoreService.updateTourPlan(newTour)
      console.log('0newToru0', newTour);
    }
      
    }
  }




checkTourIsAlreadyPresent(newLkw: number, newHour: number) {
  return this.tours.some(tour => tour.time == newHour && tour.tourcode == newLkw )
}

}
