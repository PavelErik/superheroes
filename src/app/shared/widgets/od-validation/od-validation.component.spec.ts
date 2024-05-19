import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { OdValidationComponent } from './od-validation.component';

@Component({
    template: `<od-validation [control]="control"></od-validation>`,
})
class TestHostComponent {
    control = new FormControl('');
}

describe('OdValidationComponent', () => {
    let component: OdValidationComponent;
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [OdValidationComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();

        component = fixture.debugElement.query(By.directive(OdValidationComponent)).componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set invalid and message on status change', () => {
        hostComponent.control.setValue(null);
        hostComponent.control.setValidators(Validators.required);
        hostComponent.control.markAsDirty();
        hostComponent.control.updateValueAndValidity();
        expect(component.invalid()).toBeTrue();
        expect(component.message()).toBe('Este campo es requerido');

        hostComponent.control.setValidators(Validators.nullValidator);
        hostComponent.control.markAsDirty();
        hostComponent.control.updateValueAndValidity();
        expect(component.invalid()).toBeFalse();
        expect(component.message()).toBeNull();
    });

    it('should adapt message correctly', () => {
        const errorsRequired: ValidationErrors = { required: true };
        const messageRequired = component['adaptMessage'](errorsRequired);
        expect(messageRequired).toBe('Este campo es requerido');

        const errorsMin: ValidationErrors = { min: { min: 5, actual: 2 } };
        const messageMin = component['adaptMessage'](errorsMin);
        expect(messageMin).toBe('Este campo debe ser mayor o igual a 5');

        const errorsMax: ValidationErrors = { max: { max: 5, actual: 8 } };
        const messageMax = component['adaptMessage'](errorsMax);
        expect(messageMax).toBe('Este campo debe ser menor o igual a 5');

        const errors: ValidationErrors = { minlength: { requiredLength: 5, actualLength: 2 } };
        const message = component['adaptMessage'](errors);
        expect(message).toBe('Este campo debe tener al menos 5 caracteres');

        const errorsMaxLength: ValidationErrors = { maxlength: { requiredLength: 5, actualLength: 8 } };
        const messageMaxLength = component['adaptMessage'](errorsMaxLength);
        expect(messageMaxLength).toBe('Este campo debe tener máximo 5 caracteres');

        const errorsPattern: ValidationErrors = { pattern: { requiredPattern: '^[a-zA-Z0-9]*$', actualValue: 'a' } };
        const messagePattern = component['adaptMessage'](errorsPattern);
        expect(messagePattern).toBe('Este campo no cumple con el formato requerido');
    });

    it('should handle empty errors', () => {
        const message = component['adaptMessage']({});
        expect(message).toBeNull();
    });
});
