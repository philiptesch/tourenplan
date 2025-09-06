import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import  {FirestoreServiceService} from '../../../../services/firestore-service.service'
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
    id! : string
  allarticles: any[] = [];
  articleId!:string
  constructor(private dialogRef: MatDialogRef<AddNewPackageComponent>, private firestoreService: FirestoreServiceService) {}


  ngOnInit(): void {
    this.firestoreService.articlesObersavble$.subscribe(articles => {
    this.articleId = articles[0].Id;
    this.allarticles = Object.entries(articles[0].articles).map(([key, value]) => ({
  id: key,
  ...(value as { name: string; weight: number; quantity: number })
}));
    console.log('this.allarticles', this.allarticles);
    
    });
    
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
      article: this.article, 
      id: this.id
    });

}

}
