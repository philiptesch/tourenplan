import { Component, Input,inject, EventEmitter, Output  } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SelectNewTourWindowComponent } from './select-new-tour-window/select-new-tour-window.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { TourViewComponent } from './tour-view/tour-view.component';
import {Article} from '../../../interfaces/article.interface'
import { Tour } from '../../../interfaces/tour.interface';
import { customer } from '../../../interfaces/customer.interface';
import { FirestoreServiceService } from '../../../services/firestore-service.service';
import { HandelServiceService } from '../../../services/handel-service.service';
@Component({
  selector: 'app-package',
  standalone: true,
  imports: [MatIconModule, CommonModule, TourViewComponent],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() article!: Article;
  @Input() time!: Number;
  @Input() tourcode!: number;
  @Input() tour!: Tour;
  @Input() customer!: customer[]
  id!: string;
  oldid! : string
 infoTextVisible: boolean = false
 showArticleView: boolean = false
 showTourView: boolean = false;
  readonly dialog = inject(MatDialog);
  @Output() newtourCreated = new EventEmitter<{time: string, tourcode: number, article: Article[],id:string, oldId:string, firestoreId:string}>();


constructor(private firestoreService: FirestoreServiceService, public handleService: HandelServiceService ) {

}

ngOnInit(): void {
  this.id = `drop-${this.tourcode}-${this.time}`;
}

  openDialog() {
    this.oldid = this.getId();
    console.log('this.tour.article',  this.tour.article );
    console.log('this.tour' ,this.tour);
    this.tour.article
    let dialogRef = this.dialog.open(SelectNewTourWindowComponent, {
      data: { article: this.tour.article, time: this.time, tourcode:this.tourcode, oldid: this.oldid, firestoreId: this.tour.firestoreId   }
    });

    dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('neuererwer:', result);
      let newTour = this.toArray(result)
      this.firestoreService.updateTourPlan(newTour)
      this.newtourCreated.emit(result)
    }
  });
  }
toArray(result: any) {
  return [{
    firestoreId: result.firestoreId,
    id: result.id,
    time: result.time,
    tourcode: result.tourcode,
    article: result.article
  }];
}


openDialogArticleView() {
    let id = this.getId();
    let dialogRef = this.dialog.open(ArticleViewComponent, {
      data: { article: this.tour.article, tourId: id, tour: this.tour  }, 
       panelClass: 'custom-dialog-2' 
    });
}


  getId() {
    console.log(`drop-${this.tourcode}-${this.time}`);
     return `drop-${this.tourcode}-${this.time}`
  }

  showInfoText(toggleBoolean: boolean) {
        
  
     this.infoTextVisible = toggleBoolean;
  }


  showInfoTextArticle(toggleBoolean: boolean) {
  this.showArticleView = toggleBoolean;

  }


  toggleTourView(){
   this.showTourView = !this.showTourView;

  }


  closeTourView() {
    this.showTourView = false;
  }

}
