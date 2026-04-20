import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from "@sentry/angular";
bootstrapApplication(AppComponent, appConfig)
.catch((err) => console.error(err));


Sentry.init({
  dsn: "https://7b0bb30a516004b7c05dc83092aa3b44@o4511254030909440.ingest.de.sentry.io/4511254032744528",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
})

