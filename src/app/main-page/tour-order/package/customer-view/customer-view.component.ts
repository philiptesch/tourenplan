import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { customer } from '../../../../interfaces/customer.interface';
import { Tour } from '../../../../interfaces/tour.interface';
@Component({
  selector: 'app-customer-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-view.component.html',
  styleUrl: './customer-view.component.scss'
})
export class CustomerViewComponent {
tourId!: string
customer!: customer[] 
newTourId!:string


    constructor(public dialogRef: MatDialogRef<CustomerViewComponent>, @Inject(MAT_DIALOG_DATA) public data: { customer: customer[], tourId: string, tour: Tour[]  }) {
      this.tourId = data.tourId
      this.customer = data.customer
    }
}
