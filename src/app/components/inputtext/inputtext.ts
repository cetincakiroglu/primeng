import { NgModule, Directive, HostListener, DoCheck, Optional, AfterViewInit, Input, inject, booleanAttribute } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Nullable } from 'primeng/ts-helpers';
import { BaseComponent } from 'primeng/basecomponent';
import { InputTextStyle } from './style/inputtextstyle';
import { ObjectUtils } from 'primeng/utils';

/**
 * InputText directive is an extension to standard input element with theming.
 * @group Components
 */
@Directive({
    selector: '[pInputText]',
    host: {
        class: 'p-inputtext p-component',
        '[class.p-filled]': 'filled',
        '[class.p-variant-filled]': 'variant === "filled" || config.inputStyle() === "filled"',
        '[class.p-inputtext-fluid]': 'hasFluid',
    },
    providers: [InputTextStyle],
})
export class InputText extends BaseComponent implements DoCheck, AfterViewInit {
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'filled' | 'outlined' = 'outlined';
    /**
     * Spans 100% width of the container when enabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) fluid: boolean | undefined;

    filled: Nullable<boolean>;

    _componentStyle = inject(InputTextStyle);

    get hasFluid() {
        const nativeElement = this.el.nativeElement;
        const fluidComponent = nativeElement.closest('p-fluid');

        return ObjectUtils.isEmpty(this.fluid) ? !!fluidComponent : this.fluid;
    }

    constructor(@Optional() public ngModel: NgModel) {
        super();
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.updateFilledState();
        this.cd.detectChanges();
    }

    ngDoCheck() {
        this.updateFilledState();
    }

    @HostListener('input', ['$event'])
    onInput() {
        this.updateFilledState();
    }

    updateFilledState() {
        this.filled = (this.el.nativeElement.value && this.el.nativeElement.value.length) || (this.ngModel && this.ngModel.model);
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [InputText],
    declarations: [InputText],
})
export class InputTextModule {}
