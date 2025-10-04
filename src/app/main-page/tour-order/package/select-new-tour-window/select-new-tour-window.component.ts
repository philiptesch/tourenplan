import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../../../interfaces/article.interface';
import { FirestoreServiceService } from '../../../../services/firestore-service.service';
import { customer } from '../../../../interfaces/customer.interface';
@Component({
  selector: 'app-select-new-tour-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select-new-tour-window.component.html',
  styleUrl: './select-new-tour-window.component.scss'
})
export class SelectNewTourWindowComponent {
time!: string
tourcode!: number;
article!: Article[]
allarticles!: Article[]
id!: string
inputArticle!:string
customerList! : customer[] 
customer!: customer[] 
constructor(public dialogRef: MatDialogRef<SelectNewTourWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: { article: Article[]; time: number, tourcode: number, oldid:string, customerList: customer[], customer: customer[]
  firestoreId:string  
 
 },  private firstoreServie: FirestoreServiceService) { 
   this.time = this.data.time.toString().padStart(2, '0') + ':00'; // z.B. 14 -> "14:00"
   this.article = this.data.article;
   this.tourcode = this.data.tourcode;
   this.customerList = this.data.customerList;
    this.customer = this.data.customer;
}


  ngOnInit(): void {
    this.firstoreServie.articlesObersavble$.subscribe(articles => {
    this.allarticles = articles
    console.log('this.allarticles', this.allarticles);
    });
    
  }


  filterSelectArticle(item:Article) {
    return this.article.some(art => art.name == item.name)


  //return this.allarticles.filter(all =>
  //  this.article.some(a => a.name === all.name)
  //);
  }


  filterArticleObject() {
    return this.allarticles.filter(all =>
    this.article.some(a => a.name === all.name));
  }


  filteredCustomerList(customer: customer) {
   return   this.customer.some(cust => this.customerList.some(listCust=> listCust.name === cust.name && 
    cust.name === customer.name
   ))


  }

getnewId(){
    console.log(`drop-${this.tourcode}-${this.time}`);
    const newTime = Number(this.time.split(':')[0]);
     return `drop-${this.tourcode}-${newTime}`
}

filterSelectArticleFromAll(selectArticle:Article) {
  return this.allarticles.some(art => art.name == selectArticle.name)
}

selectArticle(articleSelect:Article, index:number){
  let checkArticle = this.article.some(art => art.name == articleSelect.name)

if (checkArticle) {
      this.article.splice(index, 1);

} else {
  this.article.push(articleSelect)
}

}


changeNewTour(event:Event) {
    this.id = this.getnewId();
    this.dialogRef.close(  {
      time: this.time,
      tourcode: this.tourcode,
      article: this.article,
      id: this.id,
      oldId: this.data.oldid,
      firestoreId:this.data.firestoreId
    });

}
}
