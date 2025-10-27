import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { getAuth, deleteUser, onAuthStateChanged, confirmPasswordReset, createUserWithEmailAndPassword, } from "firebase/auth";
import { Firestore, deleteDoc, collection, addDoc, getDoc, doc, updateDoc, setDoc, query, where, getDocs, onSnapshot, arrayUnion } from '@angular/fire/firestore';
import { AuthRegisterService } from '../../services/auth-register.service';
import { customer } from '../../interfaces/customer.interface';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firestore: Firestore = inject(Firestore); // Initialisiere Firestore
  private auth = getAuth(); 
  name: string = ''
  address: string = ''
  postalCode: string = ''
  city: string = ''
  phone: string = ''
  deliveryNote: string = ''
  password: string = ''
  id: string = ''

  newCustomer: customer = {
  id: this.id ,
  name: this.name ,
  address: this.address,
  postalCode: this.postalCode ,
  city: this.city ,
  phone:  this.phone,
  deliveryNote:  this.deliveryNote,
  password:  this.password

  }


  constructor() { }

  addnewUser(event: Event) {

  }

}
