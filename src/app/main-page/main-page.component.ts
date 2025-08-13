import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TourOrderComponent } from './tour-order/tour-order.component';
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [HeaderComponent, TourOrderComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
