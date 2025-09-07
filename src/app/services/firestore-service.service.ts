import { Injectable, inject  } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { Firestore, collectionData, collection,addDoc, onSnapshot } from '@angular/fire/firestore';
import articles from '../services/article.json';
import { BehaviorSubject, timestamp } from 'rxjs';
import { Article } from '../interfaces/article.interface';
@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {
   firestore = inject(Firestore);
    private articleSubject = new BehaviorSubject(<any>[]);
    public articlesObersavble$ = this.articleSubject.asObservable();
    private articleIdSubject = new BehaviorSubject<string>('');
    public articlesIdObersavble$ = this.articleIdSubject.asObservable();
    newArray: any[] = []; 
    allarticles: any[] = [];
    articlesId!:string
  constructor() {
    this.subList()
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
    let articleMap: Article = articleArray[0].articles
    this.allarticles = Object.entries(articleMap).map(([key, value]) => ({
    id: key,   
    ...value 
    }));
    this.articleSubject.next(this.allarticles);
    this.articleIdSubject.next(this.articlesId);
    console.log("allarticles", this.articleSubject, this.articlesObersavble$,articleArray, this.articlesId );
  });
}

    getArticleRef() {
        return collection(this.firestore, 'articles');
    }



setArticleObject(obj: any) {
      return {
            name: obj.name,
            weight: obj.weight,
            quantity: obj.quantity
        };

}



//  async addJsonToFirebase() {
//  //  const docRef = await addDoc(collection(this.firestore, "articles"), 
//  this.getArticles()).then(docRef => console.log('Document added with ID:', docRef.id))
//    .catch(err => console.error(err));;
//  }


}