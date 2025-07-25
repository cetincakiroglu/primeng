import { animate, animation, AnimationEvent, style, transition, trigger, useAnimation } from '@angular/animations';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    inject,
    input,
    Input,
    NgModule,
    NgZone,
    numberAttribute,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { addClass, appendChild, getOuterHeight, getOuterWidth, getViewport, hasClass, removeClass, setAttribute, uuid } from '@primeuix/utils';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Button, ButtonProps } from 'primeng/button';
import { blockBodyScroll, DomHandler, unblockBodyScroll } from 'primeng/dom';
import { FocusTrap } from 'primeng/focustrap';
import { TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon } from 'primeng/icons';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';
import { DialogStyle } from './style/dialogstyle';

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);
/**
 * Dialog is a container to display content in an overlay window.
 * @group Components
 */
@Component({
    selector: 'p-dialog',
    standalone: true,
    imports: [CommonModule, Button, FocusTrap, TimesIcon, WindowMaximizeIcon, WindowMinimizeIcon, SharedModule],
    template: `
        <div *ngIf="maskVisible" [class]="cn(cx('mask'), maskStyleClass)" [style]="sx('mask')" [ngStyle]="maskStyle">
            <div
                *ngIf="visible"
                #container
                [class]="cn(cx('root'), styleClass)"
                [style]="sx('root')"
                [ngStyle]="style"
                pFocusTrap
                [pFocusTrapDisabled]="focusTrap === false"
                [@animation]="{
                    value: 'visible',
                    params: { transform: transformOptions, transition: transitionOptions }
                }"
                (@animation.start)="onAnimationStart($event)"
                (@animation.done)="onAnimationEnd($event)"
                [attr.role]="role"
                [attr.aria-labelledby]="ariaLabelledBy"
                [attr.aria-modal]="true"
            >
                <ng-container *ngIf="_headlessTemplate || headlessTemplate || headlessT; else notHeadless">
                    <ng-container *ngTemplateOutlet="_headlessTemplate || headlessTemplate || headlessT"></ng-container>
                </ng-container>

                <ng-template #notHeadless>
                    <div *ngIf="resizable" [class]="cx('resizeHandle')" style="z-index: 90;" (mousedown)="initResize($event)"></div>
                    <div #titlebar [class]="cx('header')" (mousedown)="initDrag($event)" *ngIf="showHeader">
                        <span [id]="ariaLabelledBy" [class]="cx('title')" *ngIf="!_headerTemplate && !headerTemplate && !headerT">{{ header }}</span>
                        <ng-container *ngTemplateOutlet="_headerTemplate || headerTemplate || headerT"></ng-container>
                        <div [class]="cx('headerActions')">
                            <p-button *ngIf="maximizable" [styleClass]="cx('pcMaximizeButton')" (onClick)="maximize()" (keydown.enter)="maximize()" [tabindex]="maximizable ? '0' : '-1'" [ariaLabel]="maximizeLabel" [buttonProps]="maximizeButtonProps">
                                <span *ngIf="maximizeIcon && !_maximizeiconTemplate && !_minimizeiconTemplate" [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
                                <ng-template #icon>
                                    <ng-container *ngIf="!maximizeIcon && !maximizeButtonProps?.icon">
                                        <WindowMaximizeIcon *ngIf="!maximized && !_maximizeiconTemplate && !maximizeIconTemplate && !maximizeIconT" />
                                        <WindowMinimizeIcon *ngIf="maximized && !_minimizeiconTemplate && !minimizeIconTemplate && !minimizeIconT" />
                                    </ng-container>
                                    <ng-container *ngIf="!maximized">
                                        <ng-template *ngTemplateOutlet="_maximizeiconTemplate || maximizeIconTemplate || maximizeIconT"></ng-template>
                                    </ng-container>
                                    <ng-container *ngIf="maximized">
                                        <ng-template *ngTemplateOutlet="_minimizeiconTemplate || minimizeIconTemplate || minimizeIconT"></ng-template>
                                    </ng-container>
                                </ng-template>
                            </p-button>
                            <p-button *ngIf="closable" [styleClass]="cx('pcCloseButton')" [ariaLabel]="closeAriaLabel" (onClick)="close($event)" (keydown.enter)="close($event)" [tabindex]="closeTabindex" [buttonProps]="closeButtonProps">
                                <ng-template #icon>
                                    <ng-container *ngIf="!_closeiconTemplate && !closeIconTemplate && !closeIconT && !closeButtonProps?.icon">
                                        <span *ngIf="closeIcon" [class]="closeIcon"></span>
                                        <TimesIcon *ngIf="!closeIcon" />
                                    </ng-container>
                                    <span *ngIf="_closeiconTemplate || closeIconTemplate || closeIconT">
                                        <ng-template *ngTemplateOutlet="_closeiconTemplate || closeIconTemplate || closeIconT"></ng-template>
                                    </span>
                                </ng-template>
                            </p-button>
                        </div>
                    </div>
                    <div #content [class]="cn(cx('content'), contentStyleClass)" [ngStyle]="contentStyle" [attr.data-pc-section]="'content'">
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="_contentTemplate || contentTemplate || contentT"></ng-container>
                    </div>
                    <div #footer [class]="cx('footer')" *ngIf="_footerTemplate || footerTemplate || footerT">
                        <ng-content select="p-footer"></ng-content>
                        <ng-container *ngTemplateOutlet="_footerTemplate || footerTemplate || footerT"></ng-container>
                    </div>
                </ng-template>
            </div>
        </div>
    `,
    animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [DialogStyle]
})
export class Dialog extends BaseComponent implements OnInit, AfterContentInit, OnDestroy {
    /**
     * Title text of the dialog.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Enables dragging to change the position using header.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) draggable: boolean = true;
    /**
     * Enables resizing of the content.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) resizable: boolean = true;
    /**
     * Style of the content section.
     * @group Props
     */
    @Input() contentStyle: any;
    /**
     * Style class of the content.
     * @group Props
     */
    @Input() contentStyleClass: string | undefined;
    /**
     * Defines if background should be blocked when dialog is displayed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) modal: boolean = false;
    /**
     * Specifies if pressing escape key should hide the dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closeOnEscape: boolean = true;
    /**
     * Specifies if clicking the modal background should hide the dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) dismissableMask: boolean = false;
    /**
     * When enabled dialog is displayed in RTL direction.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) rtl: boolean = false;
    /**
     * Adds a close icon to the header to hide the dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closable: boolean = true;
    /**
     * Object literal to define widths per screen size.
     * @group Props
     */
    @Input() breakpoints: any;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Style class of the mask.
     * @group Props
     */
    @Input() maskStyleClass: string | undefined;
    /**
     * Style of the mask.
     * @group Props
     */
    @Input() maskStyle: { [klass: string]: any } | null | undefined;
    /**
     * Whether to show the header or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showHeader: boolean = true;
    /**
     * Whether background scroll should be blocked when dialog is visible.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) blockScroll: boolean = false;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input({ transform: numberAttribute }) baseZIndex: number = 0;
    /**
     * Minimum value for the left coordinate of dialog in dragging.
     * @group Props
     */
    @Input({ transform: numberAttribute }) minX: number = 0;
    /**
     * Minimum value for the top coordinate of dialog in dragging.
     * @group Props
     */
    @Input({ transform: numberAttribute }) minY: number = 0;
    /**
     * When enabled, first focusable element receives focus on show.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) focusOnShow: boolean = true;
    /**
     * Whether the dialog can be displayed full screen.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) maximizable: boolean = false;
    /**
     * Keeps dialog in the viewport.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) keepInViewport: boolean = true;
    /**
     * When enabled, can only focus on elements inside the dialog.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) focusTrap: boolean = true;
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Name of the close icon.
     * @group Props
     */
    @Input() closeIcon: string | undefined;
    /**
     * Defines a string that labels the close button for accessibility.
     * @group Props
     */
    @Input() closeAriaLabel: string | undefined;
    /**
     * Index of the close button in tabbing order.
     * @group Props
     */
    @Input() closeTabindex: string = '0';
    /**
     * Name of the minimize icon.
     * @group Props
     */
    @Input() minimizeIcon: string | undefined;
    /**
     * Name of the maximize icon.
     * @group Props
     */
    @Input() maximizeIcon: string | undefined;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() closeButtonProps: ButtonProps = {
        severity: 'secondary',
        text: true,
        rounded: true
    };
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() maximizeButtonProps: ButtonProps = {
        severity: 'secondary',
        text: true,
        rounded: true
    };
    /**
     * Specifies the visibility of the dialog.
     * @group Props
     */
    @Input() get visible(): boolean {
        return this._visible;
    }
    set visible(value: boolean) {
        this._visible = value;

        if (this._visible && !this.maskVisible) {
            this.maskVisible = true;
        }
    }
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() get style(): any {
        return this._style;
    }
    set style(value: any) {
        if (value) {
            this._style = { ...value };
            this.originalStyle = value;
        }
    }
    /**
     * Position of the dialog.
     * @group Props
     */
    @Input() get position(): 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' {
        return this._position;
    }
    set position(value: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
        this._position = value;

        switch (value) {
            case 'topleft':
            case 'bottomleft':
            case 'left':
                this.transformOptions = 'translate3d(-100%, 0px, 0px)';
                break;
            case 'topright':
            case 'bottomright':
            case 'right':
                this.transformOptions = 'translate3d(100%, 0px, 0px)';
                break;
            case 'bottom':
                this.transformOptions = 'translate3d(0px, 100%, 0px)';
                break;
            case 'top':
                this.transformOptions = 'translate3d(0px, -100%, 0px)';
                break;
            default:
                this.transformOptions = 'scale(0.7)';
                break;
        }
    }
    /**
     * Role attribute of html element.
     * @group Emits
     */
    @Input() role: string = 'dialog';
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @defaultValue 'self'
     * @group Props
     */
    appendTo = input<HTMLElement | ElementRef | TemplateRef<any> | 'self' | 'body' | null | undefined | any>(undefined);
    /**
     * Callback to invoke when dialog is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when dialog is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();
    /**
     * This EventEmitter is used to notify changes in the visibility state of a component.
     * @param {boolean} value - New value.
     * @group Emits
     */
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke when dialog resizing is initiated.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onResizeInit: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dialog resizing is completed.
     * @param {MouseEvent} event - Mouse event.
     * @group Emits
     */
    @Output() onResizeEnd: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
    /**
     * Callback to invoke when dialog dragging is completed.
     * @param {DragEvent} event - Drag event.
     * @group Emits
     */
    @Output() onDragEnd: EventEmitter<DragEvent> = new EventEmitter<DragEvent>();
    /**
     * Callback to invoke when dialog maximized or unmaximized.
     * @group Emits
     */
    @Output() onMaximize: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('titlebar') headerViewChild: Nullable<ElementRef>;

    @ViewChild('content') contentViewChild: Nullable<ElementRef>;

    @ViewChild('footer') footerViewChild: Nullable<ElementRef>;
    /**
     * Header template.
     * @group Props
     */
    @Input('content') headerTemplate: TemplateRef<any> | undefined;
    /**
     * Content template.
     * @group Props
     */
    @Input() contentTemplate: TemplateRef<any> | undefined;
    /**
     * Footer template.
     * @group Props
     */
    @Input() footerTemplate: TemplateRef<any> | undefined;
    /**
     * Close icon template.
     * @group Props
     */
    @Input() closeIconTemplate: TemplateRef<any> | undefined;
    /**
     * Maximize icon template.
     * @group Props
     */
    @Input() maximizeIconTemplate: TemplateRef<any> | undefined;
    /**
     * Minimize icon template.
     * @group Props
     */
    @Input() minimizeIconTemplate: TemplateRef<any> | undefined;
    /**
     * Headless template.
     * @group Props
     */
    @Input() headlessTemplate: TemplateRef<any> | undefined;

    @ContentChild('header', { descendants: false }) _headerTemplate: TemplateRef<any> | undefined;

    @ContentChild('content', { descendants: false }) _contentTemplate: TemplateRef<any> | undefined;

    @ContentChild('footer', { descendants: false }) _footerTemplate: TemplateRef<any> | undefined;

    @ContentChild('closeicon', { descendants: false }) _closeiconTemplate: TemplateRef<any> | undefined;

    @ContentChild('maximizeicon', { descendants: false }) _maximizeiconTemplate: TemplateRef<any> | undefined;

    @ContentChild('minimizeicon', { descendants: false }) _minimizeiconTemplate: TemplateRef<any> | undefined;

    @ContentChild('headless', { descendants: false }) _headlessTemplate: TemplateRef<any> | undefined;

    $appendTo = computed(() => this.appendTo() || this.config.overlayAppendTo());

    _visible: boolean = false;

    maskVisible: boolean | undefined;

    container: Nullable<HTMLDivElement>;

    wrapper: Nullable<HTMLElement>;

    dragging: boolean | undefined;

    ariaLabelledBy: string = this.getAriaLabelledBy();

    documentDragListener: VoidListener;

    documentDragEndListener: VoidListener;

    resizing: boolean | undefined;

    documentResizeListener: VoidListener;

    documentResizeEndListener: VoidListener;

    documentEscapeListener: VoidListener;

    maskClickListener: VoidListener;

    lastPageX: number | undefined;

    lastPageY: number | undefined;

    preventVisibleChangePropagation: boolean | undefined;

    maximized: boolean | undefined;

    preMaximizeContentHeight: number | undefined;

    preMaximizeContainerWidth: number | undefined;

    preMaximizeContainerHeight: number | undefined;

    preMaximizePageX: number | undefined;

    preMaximizePageY: number | undefined;

    id: string = uuid('pn_id_');

    _style: any = {};

    _position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'center';

    originalStyle: any;

    transformOptions: any = 'scale(0.7)';

    styleElement: any;

    private window: Window;

    _componentStyle = inject(DialogStyle);

    headerT: TemplateRef<any> | undefined;

    contentT: TemplateRef<any> | undefined;

    footerT: TemplateRef<any> | undefined;

    closeIconT: TemplateRef<any> | undefined;

    maximizeIconT: TemplateRef<any> | undefined;

    minimizeIconT: TemplateRef<any> | undefined;

    headlessT: TemplateRef<any> | undefined;

    get maximizeLabel(): string {
        return this.config.getTranslation(TranslationKeys.ARIA)['maximizeLabel'];
    }
    zone: NgZone = inject(NgZone);

    get maskClass() {
        const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
        const pos = positions.find((item) => item === this.position);

        return {
            'p-dialog-mask': true,
            'p-overlay-mask p-overlay-mask-enter': this.modal || this.dismissableMask,
            [`p-dialog-${pos}`]: pos
        };
    }

    ngOnInit() {
        super.ngOnInit();
        if (this.breakpoints) {
            this.createStyle();
        }
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerT = item.template;
                    break;

                case 'content':
                    this.contentT = item.template;
                    break;

                case 'footer':
                    this.footerT = item.template;
                    break;

                case 'closeicon':
                    this.closeIconT = item.template;
                    break;

                case 'maximizeicon':
                    this.maximizeIconT = item.template;
                    break;

                case 'minimizeicon':
                    this.minimizeIconT = item.template;
                    break;

                case 'headless':
                    this.headlessT = item.template;
                    break;

                default:
                    this.contentT = item.template;
                    break;
            }
        });
    }

    getAriaLabelledBy() {
        return this.header !== null ? uuid('pn_id_') + '_header' : null;
    }

    parseDurationToMilliseconds(durationString: string): number | undefined {
        const transitionTimeRegex = /([\d\.]+)(ms|s)\b/g;
        let totalMilliseconds = 0;
        let match;
        while ((match = transitionTimeRegex.exec(durationString)) !== null) {
            const value = parseFloat(match[1]);
            const unit = match[2];
            if (unit === 'ms') {
                totalMilliseconds += value;
            } else if (unit === 's') {
                totalMilliseconds += value * 1000;
            }
        }
        if (totalMilliseconds === 0) {
            return undefined;
        }
        return totalMilliseconds;
    }

    _focus(focusParentElement?: HTMLElement): boolean {
        if (focusParentElement) {
            const timeoutDuration = this.parseDurationToMilliseconds(this.transitionOptions);
            let _focusableElements = DomHandler.getFocusableElements(focusParentElement);
            if (_focusableElements && _focusableElements.length > 0) {
                this.zone.runOutsideAngular(() => {
                    setTimeout(() => _focusableElements[0].focus(), timeoutDuration || 5);
                });
                return true;
            }
        }

        return false;
    }

    focus(focusParentElement?: HTMLElement) {
        let focused = this._focus(focusParentElement);

        if (!focused) {
            focused = this._focus(this.footerViewChild?.nativeElement);
            if (!focused) {
                focused = this._focus(this.headerViewChild?.nativeElement);
                if (!focused) {
                    this._focus(this.contentViewChild?.nativeElement);
                }
            }
        }
    }

    close(event: Event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }

    enableModality() {
        if (this.closable && this.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.close(event);
                }
            });
        }

        if (this.modal) {
            blockBodyScroll();
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.dismissableMask) {
                this.unbindMaskClickListener();
            }

            // for nested dialogs w/modal
            const scrollBlockers = document.querySelectorAll('.p-dialog-mask-scrollblocker');

            if (this.modal && scrollBlockers && scrollBlockers.length == 1) {
                unblockBodyScroll();
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    maximize() {
        this.maximized = !this.maximized;

        if (!this.modal && !this.blockScroll) {
            if (this.maximized) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }

        this.onMaximize.emit({ maximized: this.maximized });
    }

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.container, this.baseZIndex + this.config.zIndex.modal);
            (this.wrapper as HTMLElement).style.zIndex = String(parseInt((this.container as HTMLDivElement).style.zIndex, 10) - 1);
        }
    }

    createStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.styleElement) {
                this.styleElement = this.renderer.createElement('style');
                this.styleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.styleElement);
                let innerHTML = '';
                for (let breakpoint in this.breakpoints) {
                    innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                }

                this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
                setAttribute(this.styleElement, 'nonce', this.config?.csp()?.nonce);
            }
        }
    }

    initDrag(event: MouseEvent) {
        if (hasClass(event.target as any, 'p-dialog-maximize-icon') || hasClass(event.target as any, 'p-dialog-header-close-icon') || hasClass((<HTMLElement>event.target).parentElement, 'p-dialog-header-icon')) {
            return;
        }

        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;

            (this.container as HTMLDivElement).style.margin = '0';
            addClass(this.document.body, 'p-unselectable-text');
        }
    }

    onDrag(event: MouseEvent) {
        if (this.dragging) {
            const containerWidth = getOuterWidth(this.container);
            const containerHeight = getOuterHeight(this.container);
            const deltaX = event.pageX - (this.lastPageX as number);
            const deltaY = event.pageY - (this.lastPageY as number);
            const offset = this.container.getBoundingClientRect();

            const containerComputedStyle = getComputedStyle(this.container);

            const leftMargin = parseFloat(containerComputedStyle.marginLeft);
            const topMargin = parseFloat(containerComputedStyle.marginTop);

            const leftPos = offset.left + deltaX - leftMargin;
            const topPos = offset.top + deltaY - topMargin;
            const viewport = getViewport();

            this.container.style.position = 'fixed';

            if (this.keepInViewport) {
                if (leftPos >= this.minX && leftPos + containerWidth < viewport.width) {
                    this._style.left = `${leftPos}px`;
                    this.lastPageX = event.pageX;
                    this.container.style.left = `${leftPos}px`;
                }

                if (topPos >= this.minY && topPos + containerHeight < viewport.height) {
                    this._style.top = `${topPos}px`;
                    this.lastPageY = event.pageY;
                    this.container.style.top = `${topPos}px`;
                }
            } else {
                this.lastPageX = event.pageX;
                this.container.style.left = `${leftPos}px`;
                this.lastPageY = event.pageY;
                this.container.style.top = `${topPos}px`;
            }
        }
    }

    endDrag(event: DragEvent) {
        if (this.dragging) {
            this.dragging = false;
            removeClass(this.document.body, 'p-unselectable-text');
            this.cd.detectChanges();
            this.onDragEnd.emit(event);
        }
    }

    resetPosition() {
        (this.container as HTMLDivElement).style.position = '';
        (this.container as HTMLDivElement).style.left = '';
        (this.container as HTMLDivElement).style.top = '';
        (this.container as HTMLDivElement).style.margin = '';
    }

    //backward compatibility
    center() {
        this.resetPosition();
    }

    initResize(event: MouseEvent) {
        if (this.resizable) {
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            addClass(this.document.body, 'p-unselectable-text');
            this.onResizeInit.emit(event);
        }
    }

    onResize(event: MouseEvent) {
        if (this.resizing) {
            let deltaX = event.pageX - (this.lastPageX as number);
            let deltaY = event.pageY - (this.lastPageY as number);
            let containerWidth = getOuterWidth(this.container);
            let containerHeight = getOuterHeight(this.container);
            let contentHeight = getOuterHeight(this.contentViewChild?.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = (this.container as HTMLDivElement).style.minWidth;
            let minHeight = (this.container as HTMLDivElement).style.minHeight;
            let offset = (this.container as HTMLDivElement).getBoundingClientRect();
            let viewport = getViewport();
            let hasBeenDragged = !parseInt((this.container as HTMLDivElement).style.top) || !parseInt((this.container as HTMLDivElement).style.left);

            if (hasBeenDragged) {
                newWidth += deltaX;
                newHeight += deltaY;
            }

            if ((!minWidth || newWidth > parseInt(minWidth)) && offset.left + newWidth < viewport.width) {
                this._style.width = newWidth + 'px';
                (this.container as HTMLDivElement).style.width = this._style.width;
            }

            if ((!minHeight || newHeight > parseInt(minHeight)) && offset.top + newHeight < viewport.height) {
                (<ElementRef>this.contentViewChild).nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';

                if (this._style.height) {
                    this._style.height = newHeight + 'px';
                    (this.container as HTMLDivElement).style.height = this._style.height;
                }
            }

            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }

    resizeEnd(event: MouseEvent) {
        if (this.resizing) {
            this.resizing = false;
            removeClass(this.document.body, 'p-unselectable-text');
            this.onResizeEnd.emit(event);
        }
    }

    bindGlobalListeners() {
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }

        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }

        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentEscapeListener();
    }

    bindDocumentDragListener() {
        if (!this.documentDragListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragListener = this.renderer.listen(this.document.defaultView, 'mousemove', this.onDrag.bind(this));
            });
        }
    }

    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            this.documentDragListener();
            this.documentDragListener = null;
        }
    }

    bindDocumentDragEndListener() {
        if (!this.documentDragEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentDragEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', this.endDrag.bind(this));
            });
        }
    }

    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            this.documentDragEndListener();
            this.documentDragEndListener = null;
        }
    }

    bindDocumentResizeListeners() {
        if (!this.documentResizeListener && !this.documentResizeEndListener) {
            this.zone.runOutsideAngular(() => {
                this.documentResizeListener = this.renderer.listen(this.document.defaultView, 'mousemove', this.onResize.bind(this));
                this.documentResizeEndListener = this.renderer.listen(this.document.defaultView, 'mouseup', this.resizeEnd.bind(this));
            });
        }
    }

    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            this.documentResizeListener();
            this.documentResizeEndListener();
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }

    bindDocumentEscapeListener() {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.key == 'Escape') {
                this.close(event);
            }
        });
    }

    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

    appendContainer() {
        if (this.$appendTo() && this.$appendTo() !== 'self') {
            if (this.$appendTo() === 'body') this.renderer.appendChild(this.document.body, this.wrapper);
            else appendChild(this.$appendTo(), this.wrapper);
        }
    }

    restoreAppend() {
        if (this.container && this.$appendTo() !== 'self') {
            this.renderer.appendChild(this.el.nativeElement, this.wrapper);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.wrapper = this.container?.parentElement;
                this.attrSelector && this.container.setAttribute(this.attrSelector, '');
                this.appendContainer();
                this.moveOnTop();
                this.bindGlobalListeners();
                this.container?.setAttribute(this.id, '');

                if (this.modal) {
                    this.enableModality();
                }

                // if (!this.modal && this.blockScroll) {
                //     addClass(this.document.body, 'p-overflow-hidden');
                // }

                if (this.focusOnShow) {
                    this.focus();
                }
                break;

            case 'void':
                if (this.wrapper && this.modal) {
                    addClass(this.wrapper, 'p-overlay-mask-leave');
                }
                break;
        }
    }

    onAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                this.cd.markForCheck();

                if (this.maskVisible !== this.visible) {
                    this.maskVisible = this.visible;
                }
                break;
            case 'visible':
                this.onShow.emit({});
                break;
        }
    }

    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;

        this.maskVisible = false;

        if (this.maximized) {
            // removeClass(this.document.body, 'p-overflow-hidden')
            this.document.body.style.removeProperty('--scrollbar;-width');
            this.maximized = false;
        }

        if (this.modal) {
            this.disableModality();
        }

        // if (this.blockScroll) {
        //      removeClass(this.document.body, 'p-overflow-hidden');
        // }

        if (hasClass(this.document.body, 'p-overflow-hidden')) {
            removeClass(this.document.body, 'p-overflow-hidden');
        }

        if (this.container && this.autoZIndex) {
            ZIndexUtils.clear(this.container);
        }

        this.container = null;
        this.wrapper = null;

        this._style = this.originalStyle ? { ...this.originalStyle } : {};
    }

    destroyStyle() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }

    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }

        this.destroyStyle();
        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [Dialog, SharedModule],
    exports: [Dialog, SharedModule]
})
export class DialogModule {}
