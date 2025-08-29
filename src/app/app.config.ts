import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"tourenplan-6d4ae","appId":"1:619354557814:web:3f6b83b6d088ebeb5a3e57","storageBucket":"tourenplan-6d4ae.firebasestorage.app","apiKey":"AIzaSyAfOaj-ihalZHR_ZavxOvvmo0Swe1WEnxs","authDomain":"tourenplan-6d4ae.firebaseapp.com","messagingSenderId":"619354557814"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
