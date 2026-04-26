import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogoPageComponent } from './logo-page/logo-page.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, LogoPageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   private router = inject(Router);
   changeHeightAndWidth: boolean = false

  constructor() {
      this.startLogoAnimation()

   }



   startLogoAnimation() {
    setTimeout(() => {
      this.changeHeightAndWidth = true
    }, 2000);

   }


  goToSignUp() { 
this.router.navigate(['/signUp']);
  }
}
