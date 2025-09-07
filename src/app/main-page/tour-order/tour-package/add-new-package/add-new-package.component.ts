import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import  {FirestoreServiceService} from '../../../../services/firestore-service.service'
import { Article } from '../../../../interfaces/article.interface';
import { ifError } from 'assert';
import { log } from 'console';
@Component({
  selector: 'app-add-new-package',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-new-package.component.html',
  styleUrl: './add-new-package.component.scss'
})
export class AddNewPackageComponent implements OnInit {
time!: string
tourcode!: string;
article!: string
lkws = [1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,16,17,18,19,20];
  newTour = {
    time: '',
    tourcode: '',
    article: ''
  };
  selcectArticles: Article[] = [];
    id! : string
  allarticles: Article[] = [];
  checkAllArticle: Article[] = [];
  articleId!:string
  constructor(private dialogRef: MatDialogRef<AddNewPackageComponent>, private firestoreService: FirestoreServiceService) {}


  ngOnInit(): void {
    this.firestoreService.articlesObersavble$.subscribe(articles => {
    this.allarticles = articles
    console.log('this.allarticles', this.allarticles);
    });

    this.firestoreService.articlesIdObersavble$.subscribe(id => {
       this.articleId =id
        console.log('this.allarticles', this.articleId);
    })
    
  }

  getId() {
    const newTime = Number(this.time.split(':')[0]);
    console.log(`drop-${this.tourcode}-${this.time}`);
     return `drop-${this.tourcode}-${newTime}`
  }

createTour(event: Event) {
  this.id = this.getId();
  console.log('this.arer', this.article ),
  
  event.preventDefault();
    this.dialogRef.close({
      time: this.time,
      tourcode: this.tourcode,
      article: this.selcectArticles, 
      id: this.id
    });

}



onInputChange(event:Event) {
  const input = event.target as HTMLInputElement; // Typ-Casting
  const value = input.value; // Wert des Inputs
  console.log('Eingegebener Wert:', value);

    if (value.length >= 2) {
      this.checkAllArticle = this.allarticles.filter(art => art.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
      console.log('this.checkAllArticle',this.checkAllArticle);
      
    }

}


selectArticle(article: Article) {
  const alreadySelected = this.selcectArticles.includes(article);
  if (alreadySelected) {
    this.selcectArticles = this.selcectArticles.filter(a => a !== article);
  } else {
    this.selcectArticles.push(article);
  }

}

isSelected(article: Article) {
  return this.selcectArticles.some(art => art == article)
}


}