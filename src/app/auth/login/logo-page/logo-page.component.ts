import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-page.component.html',
  styleUrl: './logo-page.component.scss'
})
export class LogoPageComponent {


     changeHeightAndWidth: boolean = false

  constructor() {
      this.startLogoAnimation()

   }



   startLogoAnimation() {
    setTimeout(() => {
      this.changeHeightAndWidth = true
    }, 3000);

   }

}
