import { Injectable, inject  } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Firestore, collectionData, collection,addDoc, onSnapshot, updateDoc, doc, query, where, getDocs } from '@angular/fire/firestore';
import articles from '../services/article.json';
import  customerJSON from '../services/customerJSON.json';
import { customer } from '../interfaces/customer.interface';
import { BehaviorSubject, timestamp } from 'rxjs';
import { Article } from '../interfaces/article.interface';
import { Tour } from '../interfaces/tour.interface';
import { User } from '../interfaces/user.inferface';
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
    private customerSubject = new BehaviorSubject(<customer[]>[]);
    public  customerObersavble$ = this.customerSubject.asObservable();
    newArray: any[] = []; 
    allarticles: any[] = [];
    articlesId!:string
    tour: Tour[] = []
    new: any = []
    user: User[] = []
    private auth = getAuth();
  constructor() {
    this.subList()
    this.subListTouren()
    this.subListCusteromer()
   }

   getcustomerJSON() {
    return customerJSON;
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


subListCusteromer() {
  return onSnapshot(this.getCustomerRef(), (snapshot) => {

    const customerArray: any[] =[]

    snapshot.forEach(element => {
        customerArray.push({fireStoreId: element.id,       
      ...element.data() as customer})
    });
    console.log('customerArray',customerArray);
    
    this.customerSubject.next(customerArray)
    this.getOngoingId()

});



  
}

async registerNewUser(newUser: User ) {
  
  if (newUser) {
    createUserWithEmailAndPassword(this.auth, newUser.email, newUser.email)
      .then(async (userCredential) => {
    const user = userCredential.user;
    await this.addNewUserInFirebase(newUser)
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
  });

  }
}




async addNewUserInFirebase(user: User) {
  
const docRef = await addDoc(this.getCustomerRef(), this.userJSON(user));
const maxId = this.getOngoingId()
//const q = query(this.getCustomerRef(), where("name", "==", user.name));

//const querySnapshot = await getDocs(q);
//querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  //console.log(doc.id, " => ", doc.data()); });

console.log(docRef);
try {
    if (docRef.id) {
      await updateDoc(docRef, {
        fireStoreId: docRef.id,
        id: maxId +1
});
    }
  
} catch (error) {
  
}

}

getOngoingId() {
let arr = this.customerSubject.getValue().map(c => Number(c.id));
let  maxNumber = Math.max(...arr);
return maxNumber

  
}



userJSON(user:User) {
  return {
  id: null,
  name: user.name,
  adress: user.adress,
  postalCode: user.postalCode,
  city: user.city,
  phone: user.phone,
  deliveryNote: user.deliveryNote
};
}






customerJSON(data: any, id:any) {
  return {
  id: data.id,
  name: data.name,
  address: data.address,
  postalCode: data.postalCode,
  city: data.city,
  phone: data.phone,
  deliveryNote: data.deliveryNote,
  fireStoreId: id 
};
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


    
    getCustomerRef() {
       return collection(this.firestore, 'customer');
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



  //async addJsonToFirebase() {
  //const docRef = await addDoc(collection(this.firestore, "customer"), 
  // this.getcustomerJSON()).then(docRef => console.log('Document added with ID:', docRef.id))
   //  .catch(err => console.error(err));;
   //}


//async addjson() {
  //try {
 //   for (const customer of this.getcustomerJSON()) {
//      const docRef = await addDoc(
   //     collection(this.firestore, "customer"),
////        customer
   //   );
  //    console.log("Kunde hinzugefügt mit ID:", docRef.id);
  //  }
//  } catch (error) {
  //  console.error("Fehler beim Import der Kunden:", error);
 // }
//}


}

