import { CommonModule } from '@angular/common';

import { ChangeDetectionStrategy, Component, Input, OnInit, signal, inject, DestroyRef } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'od-validation',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './od-validation.component.html',
    styleUrls: ['./od-validation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OdValidationComponent implements OnInit {
    @Input({ required: true }) public control!: FormControl;

    public invalid = signal<boolean>(false);
    public message = signal<string | null>(null);
    private _destroy$ = inject(DestroyRef);

    ngOnInit() {
        this.control.statusChanges.pipe(takeUntilDestroyed(this._destroy$)).subscribe(() => {
            this.invalid.set(this.control.invalid && this.control.dirty);
            this.message.set(this.adaptMessage(this.control.errors ?? {}));
        });
    }

    private adaptMessage(errors: ValidationErrors): string | null {
        const errorMessage = ERRORS_MESSAGES.filter((x) => errors && errors[x.type])
            .sort((x, y) => x.priority - y.priority)
            .at(0);
        if (errorMessage === undefined) return null;

        const errorData: IErrorData = typeof errors[errorMessage.type] === 'object' ? errors[errorMessage.type] : null;
        let message = errorMessage.message;
        if (errorData) {
            message = message.replace(
                '$',
                errorData.min?.toString() ??
                    errorData.max?.toString() ??
                    errorData.requiredLength?.toString() ??
                    errorData.requiredPattern ??
                    ''
            );
        }

        return message;
    }
}

interface IErrorData {
    min?: number;
    max?: number;
    requiredLength?: number;
    requiredPattern?: string;
}

interface IErrorMessage {
    type: string;
    message: string;
    priority: number;
}

const ERRORS_MESSAGES: IErrorMessage[] = [
    {
        type: 'required',
        message: 'Este campo es requerido',
        priority: 1,
    },
    {
        type: 'min',
        message: 'Este campo debe ser mayor o igual a $',
        priority: 2,
    },
    {
        type: 'max',
        message: 'Este campo debe ser menor o igual a $',
        priority: 3,
    },
    {
        type: 'minlength',
        message: 'Este campo debe tener al menos $ caracteres',
        priority: 4,
    },
    {
        type: 'maxlength',
        message: 'Este campo debe tener máximo $ caracteres',
        priority: 5,
    },
    {
        type: 'pattern',
        message: 'Este campo no cumple con el formato requerido',
        priority: 6,
    },
];
