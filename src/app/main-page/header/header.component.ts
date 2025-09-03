import { Component } from '@angular/core';
import { FirestoreServiceService } from '../../services/firestore-service.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


constructor(private FirestoreService: FirestoreServiceService) {


}



}
