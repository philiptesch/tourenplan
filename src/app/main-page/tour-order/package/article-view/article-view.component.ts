import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Article } from '../../../../interfaces/article.interface'
import { Tour } from '../../../../interfaces/tour.interface';
@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.scss'
})
export class ArticleViewComponent {
tourId!: string
article!: Article[] 

  constructor(public dialogRef: MatDialogRef<ArticleViewComponent>, @Inject(MAT_DIALOG_DATA) public data: { article: Article[], tourId: string, tour: Tour[]  }) {
    this.tourId = data.tourId
    this.article = data.article
  }
  
}
