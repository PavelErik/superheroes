import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import { GetSuperheroeModel } from '@modules/superheroes-module/domain';

@Injectable({ providedIn: 'root' })
export class SuperheroeUtilService {
    private readonly _loadingTable = signal<boolean | null>(null);
    private readonly _superheroe = signal<GetSuperheroeModel | null>(null);
    public readonly loadingTable$ = toObservable(this._loadingTable);
    public readonly superheroe$ = toObservable(this._superheroe);

    setLoadingTable(loading: boolean | null): void {
        this._loadingTable.set(loading);
    }

    setSuperheroe(superheroe: GetSuperheroeModel): void {
        this._superheroe.set(superheroe);
    }

    clearSuperheroe(): void {
        this._superheroe.set(null);
    }
}
