import { ApplicationConfig } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideCore } from '@core/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideCore(),
        provideRouter(
            routes,
            withInMemoryScrolling({ anchorScrolling: 'enabled' }),
            withPreloading(PreloadAllModules),
            withViewTransitions()
        ),
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
};
