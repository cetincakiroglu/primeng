import { Component } from '@angular/core';
import { ReactiveFormsDoc } from '@doc/selectbutton/reactiveformsdoc';
import { AccessibilityDoc } from '@doc/selectbutton/accessibilitydoc';
import { BasicDoc } from '@doc/selectbutton/basicdoc';
import { DisabledDoc } from '@doc/selectbutton/disableddoc';
import { ImportDoc } from '@doc/selectbutton/importdoc';
import { InvalidDoc } from '@doc/selectbutton/invaliddoc';
import { MultipleDoc } from '@doc/selectbutton/multipledoc';
import { TemplateDoc } from '@doc/selectbutton/templatedoc';
import { SelectButtonDocModule } from '@doc/selectbutton/selectbuttondoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular SelectButton Component"
        header="SelectButton"
        description="SelectButton is used to choose single or multiple items from a list using buttons."
        [docs]="docs"
        [apiDocs]="['SelectButton']"
        themeDocs="selectbutton"
    ></app-doc>`,
    standalone: true,
    imports: [SelectButtonDocModule],
})
export class SelectButtonDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'reactive-forms',
            label: 'Reactive Forms',
            component: ReactiveFormsDoc,
        },
        {
            id: 'multiple',
            label: 'Multiple',
            component: MultipleDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'invalid',
            label: 'Invalid',
            component: InvalidDoc,
        },
        {
            id: 'disabled',
            label: 'Disabled',
            component: DisabledDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
