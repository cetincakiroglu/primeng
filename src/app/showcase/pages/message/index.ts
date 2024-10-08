import { Component } from '@angular/core';
import { IconDoc } from '@doc/message/icondoc';
import { BasicDoc } from '@doc/message/basicdoc';
import { ImportDoc } from '@doc/message/importdoc';
import { MessageDocModule } from '@doc/message/messagedoc.module';
import { FormDoc } from '@doc/message/formdoc';
import { DynamicDoc } from '@doc/message/dynamicdoc';
import { ClosableDoc } from '@doc/message/closabledoc';
import { LifeDoc } from '@doc/message/lifedoc';
import { AccessibilityDoc } from '@doc/message/accessibilitydoc';

@Component({
    template: `<app-doc
        docTitle="Angular Message Component"
        header="Message"
        description="Message component is used to display inline messages."
        [docs]="docs"
        [apiDocs]="['Message']"
        themeDocs="message"
    ></app-doc>`,
    imports: [MessageDocModule],
    standalone: true,
})
export class MessageDemo {
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
            id: 'icon',
            label: 'Icon',
            component: IconDoc,
        },
        {
            id: 'form',
            label: 'Form',
            component: FormDoc,
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc,
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc,
        },
        {
            id: 'life',
            label: 'Life',
            component: LifeDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
