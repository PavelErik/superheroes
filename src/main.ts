import { bootstrapApplication } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { environment } from '@env/environment';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (environment.production) enableProdMode();
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
