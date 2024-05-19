import { CommonModule } from '@angular/common';
import { ChipModule } from 'primeng/chip';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'od-select',
    standalone: true,
    imports: [CommonModule, ChipModule],
    templateUrl: './od-select.component.html',
    styleUrls: ['./od-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OdSelectComponent {
    @Input({ required: true }) public elements: unknown[] = [];
    @Output() public reset = new EventEmitter<void>();

    onReset(): void {
        this.reset.emit();
    }
}
