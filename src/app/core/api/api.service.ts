import { Injectable, inject } from '@angular/core';

import { OdMessageService } from './';
import { OdSpinnerService } from './';

@Injectable()
export class ApiService {
    private _odMessageService = inject(OdMessageService);
    private _odSpinnerService = inject(OdSpinnerService);

    message(): OdMessageService {
        return this._odMessageService;
    }

    spinner(): OdSpinnerService {
        return this._odSpinnerService;
    }
}
