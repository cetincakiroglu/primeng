import { Component } from '@angular/core';
import { BasicDoc } from '@doc/progressbar/basicdoc';
import { ImportDoc } from '@doc/progressbar/importdoc';
import { TemplateDoc } from '@doc/progressbar/templatedoc';
import { IndeterminateDoc } from '@doc/progressbar/indeterminatedoc';
import { DynamicDoc } from '@doc/progressbar/dynamicdoc';
import { AccessibilityDoc } from '@doc/progressbar/accessibilitydoc';
import { ProgressBarDocModule } from '@doc/progressbar/progressbardoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular ProgressBar Component"
        header="ProgressBar"
        description="ProgressBar is a process status indicator."
        [docs]="docs"
        [apiDocs]="['ProgressBar']"
        themeDocs="progressbar"
    ></app-doc>`,
    standalone: true,
    imports: [ProgressBarDocModule],
})
export class ProgressBarDemo {
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
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc,
        },
        {
            id: 'indeterminate',
            label: 'Indeterminate',
            component: IndeterminateDoc,
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
