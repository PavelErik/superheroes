import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'app-error-404-page',
    standalone: true,
    imports: [CommonModule, RouterModule, ButtonModule, RippleModule],
    templateUrl: './error-404-page.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Error404PageComponent {}
