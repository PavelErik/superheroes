import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ApiService } from './api';

export const provideCore = (): (Provider | EnvironmentProviders)[] => {
    return [provideHttpClient(), ApiService, ConfirmationService, MessageService];
};
