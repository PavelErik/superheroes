import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { OdSelectComponent } from './od-select.component';

@Component({
    template: `<od-select [elements]="elements" (reset)="onReset()"></od-select>`,
})
class TestHostComponent {
    elements: unknown[] = [];
    onReset = () => {
        this.elements = [];
    };
}

describe('OdSelectComponent', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent],
            imports: [OdSelectComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        const odSelectDebugElement = fixture.debugElement.query(By.directive(OdSelectComponent));
        expect(odSelectDebugElement).not.toBeNull();
    });

    it('should accept elements input', () => {
        hostComponent.elements = [1, 2, 3];
        fixture.detectChanges();
        const odSelectComponent = fixture.debugElement.query(By.directive(OdSelectComponent)).componentInstance;
        expect(odSelectComponent.elements).toEqual([1, 2, 3]);
    });

    it('should emit reset event when onReset is called', () => {
        const odSelectComponent = fixture.debugElement.query(By.directive(OdSelectComponent)).componentInstance;
        spyOn(hostComponent, 'onReset');
        odSelectComponent.onReset();
        fixture.detectChanges();
        expect(hostComponent.onReset).toHaveBeenCalled();
    });

    it('should emit reset event when onReset is called (directly)', () => {
        const odSelectComponent = fixture.debugElement.query(By.directive(OdSelectComponent)).componentInstance;
        let resetEmitted = false;
        odSelectComponent.reset.subscribe(() => (resetEmitted = true));
        odSelectComponent.onReset();
        expect(resetEmitted).toBeTrue();
    });
});
