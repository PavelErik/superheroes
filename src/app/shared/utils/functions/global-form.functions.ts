import { FormGroup } from '@angular/forms';

export class GlobalFormFunctions {
    public static showErrorsForm(form: FormGroup): void {
        Object.keys(form?.controls).forEach((key) => {
            form?.controls[key].markAsDirty();
            form?.controls[key].markAsTouched();
            form?.controls[key].updateValueAndValidity();
        });
        form?.markAllAsTouched();
    }
}
