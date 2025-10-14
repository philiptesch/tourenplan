import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
export const routes: Routes = [
     {
    path: 'MainPage',
    component: MainPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },

];
