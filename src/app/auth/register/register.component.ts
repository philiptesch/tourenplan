import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { getAuth, deleteUser, onAuthStateChanged, confirmPasswordReset, createUserWithEmailAndPassword, } from "firebase/auth";
import { Firestore, deleteDoc, collection, addDoc, getDoc, doc, updateDoc, setDoc, query, where, getDocs, onSnapshot, arrayUnion } from '@angular/fire/firestore';
import { customer } from '../../interfaces/customer.interface';
import { User } from '../../interfaces/user.inferface';
import { FormsModule } from '@angular/forms';
import { FirestoreServiceService } from '../../services/firestore-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule, FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore); // Initialisiere Firestore
  private auth = getAuth(); 
  name: string = ''
  adress: string = ''
  postalCode!: number
  city: string = ''
  phone: string = ''
  deliveryNote: string = ''
  password: string = ''
  id: string = ''
  email: string = ''

  newCustomer: User = {
  id: this.id ,
  name: this.name ,
  adress: this.adress,
  postalCode: this.postalCode,
  city: this.city ,
  phone:  this.phone,
  deliveryNote:  this.deliveryNote,
  password:  this.password,
  email:  this.email 
  }

   customer!: customer[]
  UserIsAlReadyInUse = false


  ngOnInit(): void {
    this.authService.customerObersavble$.subscribe(sub=>
     this.customer = sub
    )
    console.log('this.customer', this.customer);
    
    
  }


  constructor(private authService : FirestoreServiceService ) {


   }

  async addnewUser(event: User) {
    console.log('customer', this.newCustomer);
    this.checkUserIsInUse(this.newCustomer)
   await this.authService.registerNewUser(this.newCustomer )
  }





checkUserIsInUse(newUser: User ) {


  const exists = this.customer.some(c => c.email == newUser.email && c.name == newUser.name );
  
  if (!exists) {
    this.UserIsAlReadyInUse = true
  }
    this.UserIsAlReadyInUse = false
}

}
