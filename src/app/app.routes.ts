import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoPageComponent } from './auth-component/logo-page/logo-page.component';
import { RegisterComponent } from './auth/register/register.component';
export const routes: Routes = [

   {
    path: 'logo',
    component: LogoPageComponent,
  },

     {
    path: 'mainPage',
    component: MainPageComponent,
  },

  {
    path: 'signUp',
    component: RegisterComponent,
  },

];
