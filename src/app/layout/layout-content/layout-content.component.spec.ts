import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ApiService } from '@core/api';
import { GlobalConfigConstants } from '@shared/utils';
import { LayoutContentComponent } from './layout-content.component';

describe('LayoutContentComponent', () => {
    let component: LayoutContentComponent;
    let fixture: ComponentFixture<LayoutContentComponent>;

    const loading = new Subject<boolean>();
    const mockApiServiceSpinner = {
        spinner: jasmine.createSpy('spinner').and.returnValue({
            loading$: loading.asObservable(),
        }),
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LayoutContentComponent],
            providers: [
                {
                    provide: ApiService,
                    useValue: mockApiServiceSpinner,
                },
                MessageService,
                ConfirmationService,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call ApiService spinner and subscribe to loading$', () => {
        loading.next(true);
        expect(component.loading()).toBeTrue();
        loading.next(false);
        expect(component.loading()).toBeFalse();
    });

    it('should have correct configurations', () => {
        expect(component.TOAST_CONFIG).toBe(GlobalConfigConstants.TOAST_CONFIG);
        expect(component.CONFIRM_DIALOG_CONFIG).toBe(GlobalConfigConstants.CONFIRM_DIALOG_CONFIG);
    });
});
