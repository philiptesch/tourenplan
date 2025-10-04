import { Component, inject, EventEmitter, Output, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddNewPackageComponent } from './add-new-package/add-new-package.component';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { customer } from '../../../interfaces/customer.interface';
@Component({
  selector: 'app-tour-package',
  standalone: true,
  imports: [MatButtonModule,MatIconModule, MatDividerModule, MatCardModule, MatDialogModule],
  templateUrl: './tour-package.component.html',
  styleUrl: './tour-package.component.scss'
})
export class TourPackageComponent {
  readonly dialog = inject(MatDialog);
  @Output() tourCreated = new EventEmitter<{time: string, tourcode: number, article: string, id:string, oldId:string, firestoreId:string,customer: customer[]}>();
  constructor(private firstoreServie: FirestoreServiceService) {

  }





openDialog() {
  const dialogRef = this.dialog.open(AddNewPackageComponent);

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Neue Tour aus Dialog:', result);
      this.getNewPackage(result)
      this.firstoreServie.addTourInFireBase(result)
    }
  });
}


getNewPackage(result: any) {
this.tourCreated.emit(result)
}



}