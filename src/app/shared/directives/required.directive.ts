import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
    standalone: true,
    selector: '[required]',
})
export class RequiredDirective implements OnInit {
    @Input({ required: true, alias: 'required' }) public control!: FormControl;
    @HostBinding('class.required-field') public required: boolean = false;

    ngOnInit(): void {
        const validator: any = this.control.validator?.(new FormControl());
        this.required = !!validator?.required;
    }
}
