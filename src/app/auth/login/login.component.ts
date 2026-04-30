import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogoPageComponent } from './logo-page/logo-page.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, LogoPageComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   private router = inject(Router);
    showLoginPage: boolean = false

  constructor() {
      this.startLogoAnimation()

   }



   startLogoAnimation() {
    setTimeout(() => {
      this.showLoginPage = true
    }, 3000);

   }


  goToSignUp() { 
this.router.navigate(['/signUp']);
  }
}
