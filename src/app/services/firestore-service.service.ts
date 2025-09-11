import { Injectable, inject  } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Firestore, collectionData, collection,addDoc, onSnapshot, updateDoc, doc } from '@angular/fire/firestore';
import articles from '../services/article.json';
import { BehaviorSubject, timestamp } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { Tour } from '../interfaces/tour.interface';
import { log } from 'node:console';
@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
   firestore = inject(Firestore);
    private articleSubject = new BehaviorSubject(<any>[]);
    public articlesObersavble$ = this.articleSubject.asObservable();
    private articleIdSubject = new BehaviorSubject<string>('');
    public articlesIdObersavble$ = this.articleIdSubject.asObservable();
    private tourSubject = new BehaviorSubject(<Tour[]>[]);
    public tourObersavble$ = this.tourSubject.asObservable();
    newArray: any[] = []; 
    allarticles: any[] = [];
    articlesId!:string
    tour: Tour[] = []
  constructor() {
    this.subList()
    this.subListTouren()
   }

   getArticles() {
    return articles;
  }

subList() {
  return onSnapshot(this.getArticleRef(), (snapshot) => {
    const articleArray: any[] = [];
  
    snapshot.forEach(element => {
      articleArray.push({
        Id:element.id,   // Firestore ID
        ...element.data() // Felder aus dem Dokument
    });
    }
  );
    this.articlesId = articleArray[0].Id
    let articleMap = articleArray[0].articles
    this.allarticles = Object.values(articleMap)
    this.articleSubject.next(this.allarticles);
    this.articleIdSubject.next(this.articlesId);
    console.log("allarticles", this.articleSubject, this.articlesObersavble$,articleArray, this.articlesId );
  });
}



subListTouren() {
  return onSnapshot(this.getTourRef(), (snapshot) => {
      const tourArray: Tour[] = [];
  
    snapshot.forEach(element => {
      tourArray.push(
        element.data() as Tour);
    }
  );
  this.tour = tourArray
  this.tourSubject.next(this.tour);
  console.log('tourArray', this.tour  );

   });
}

    getArticleRef() {
        return collection(this.firestore, 'articles');
    }


    getTourRef() {
       return collection(this.firestore, 'touren');
    }

async addTourInFireBase(tour: Tour) {
  try {
    const docRef = await addDoc(this.getTourRef(), tour);
    await updateDoc(docRef, { firestoreId: docRef.id });
    console.log("Tour gespeichert mit ID:", docRef.id);
  } catch (error) {
    console.error("Fehler beim Speichern der Tour:", error);
  }
}


setArticleObject(obj: any) {
      return {
            name: obj.name,
            weight: obj.weight,
            quantity: obj.quantity
        };

}


 async updateTourPlan(newTour:any) {
  const tour = newTour[0];
  let tourFireStoreId = tour.firestoreId
  try {
    const tourDocRef = doc(this.getTourRef(), tourFireStoreId )
    await updateDoc(tourDocRef, tour);
    console.log('Tour erfolgreich aktualisiert!');
  } catch (error) {
    console.error('Fehler beim Update:', error);
  }

}



//  async addJsonToFirebase() {
//  //  const docRef = await addDoc(collection(this.firestore, "articles"), 
//  this.getArticles()).then(docRef => console.log('Document added with ID:', docRef.id))
//    .catch(err => console.error(err));;
//  }


}