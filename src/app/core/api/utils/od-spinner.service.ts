import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root',
})
export class OdSpinnerService {
    private readonly _loading = signal(false);
    public readonly loading$ = toObservable(this._loading);

    show(): void {
        this._loading.set(true);
    }

    hide(): void {
        this._loading.set(false);
    }
}
