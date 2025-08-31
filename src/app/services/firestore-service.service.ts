import { Injectable, inject  } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Firestore, collectionData, collection,addDoc } from '@angular/fire/firestore';
import articles from '../services/article.json';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
   firestore = inject(Firestore);
  constructor() {
    this.getArticles()
    
   }

   getArticles() {
    return articles;
  }


  async addJsonToFirebase() {
const docRef = await addDoc(collection(this.firestore, "articles"), 
this.getArticles()).then(docRef => console.log('Document added with ID:', docRef.id))
  .catch(err => console.error(err));;
}


}