import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { BlockUIModule } from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';

import { ApiService } from '@core/api';
import { GlobalConfigConstants } from '@shared/utils';

@Component({
    selector: 'app-layout-content',
    standalone: true,
    imports: [CommonModule, RouterOutlet, BlockUIModule, ButtonModule, ConfirmDialogModule, ToastModule, RippleModule],
    templateUrl: './layout-content.component.html',
    styleUrl: './layout-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContentComponent {
    public readonly loading = signal(false);
    public readonly TOAST_CONFIG = GlobalConfigConstants.TOAST_CONFIG;
    public readonly CONFIRM_DIALOG_CONFIG = GlobalConfigConstants.CONFIRM_DIALOG_CONFIG;
    private readonly _apiService = inject(ApiService);
    private readonly _primengConfig = inject(PrimeNGConfig);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._primengConfig.ripple = true;
        this._apiService
            .spinner()
            .loading$.pipe(
                filter((x) => x !== this.loading()),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((x) => this.loading.set(x));
    }
}
