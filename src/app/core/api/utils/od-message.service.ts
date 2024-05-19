import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

import { GlobalConfigConstants } from '@shared/utils';

@Injectable({
    providedIn: 'root',
})
export class OdMessageService {
    private readonly _CONFIG = GlobalConfigConstants.TOAST_CONFIG;
    private readonly _messageService = inject(MessageService);

    success(message: string): void {
        this._messageService.add({
            key: this._CONFIG.KEY,
            summary: this._CONFIG.HEADER.SUCCESS,
            life: this._CONFIG.LIFE,
            detail: message,
            severity: 'success',
        });
    }

    info(message: string): void {
        this._messageService.add({
            key: this._CONFIG.KEY,
            summary: this._CONFIG.HEADER.INFO,
            life: this._CONFIG.LIFE,
            detail: message,
            severity: 'info',
        });
    }

    warm(message: string): void {
        this._messageService.add({
            key: this._CONFIG.KEY,
            summary: this._CONFIG.HEADER.WARNING,
            life: this._CONFIG.LIFE,
            detail: message,
            severity: 'warn',
        });
    }

    error(message: string): void {
        this._messageService.add({
            key: this._CONFIG.KEY,
            summary: this._CONFIG.HEADER.ERROR,
            life: this._CONFIG.LIFE,
            detail: message,
            severity: 'error',
        });
    }
}
