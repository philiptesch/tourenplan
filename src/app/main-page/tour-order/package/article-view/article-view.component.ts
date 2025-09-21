import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../../../interfaces/article.interface'
import { Tour } from '../../../../interfaces/tour.interface';
@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.scss'
})
export class ArticleViewComponent implements OnInit {
tourId!: string
article!: Article[] 
newTourId!:string

  constructor(public dialogRef: MatDialogRef<ArticleViewComponent>, @Inject(MAT_DIALOG_DATA) public data: { article: Article[], tourId: string, tour: Tour[]  }) {
    this.tourId = data.tourId
    this.article = data.article
  }


  ngOnInit(): void {
    this.changeTourName()
    
  }


  changeTourName() {
    this.newTourId = this.tourId.split('drop-')[1]
    
  }
  
}
