import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Error404PageComponent } from './error-404-page.component';

describe('Error404PageComponent', () => {
    let component: Error404PageComponent;
    let fixture: ComponentFixture<Error404PageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Error404PageComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Error404PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
