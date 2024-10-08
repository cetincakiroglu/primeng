import { Component } from '@angular/core';
import { TemplateDoc } from '@doc/menubar/templatedoc';
import { BasicDoc } from '@doc/menubar/basicdoc';
import { ImportDoc } from '@doc/menubar/importdoc';
import { AccessibilityDoc } from '@doc/menubar/accessibilitydoc';
import { CommandDoc } from '@doc/menubar/commanddoc';
import { RouterDoc } from '@doc/menubar/routerdoc';
import { MenubarDocModule } from '@doc/menubar/menubardoc.module';

@Component({
    template: `<app-doc
        docTitle="Angular Menubar Component"
        header="Menubar"
        description="Menubar is a horizontal menu component."
        [docs]="docs"
        [apiDocs]="['Menubar', 'MenuItem']"
        themeDocs="menubar"
    ></app-doc> `,
    standalone: true,
    imports: [MenubarDocModule],
})
export class MenubarDemo {
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
            id: 'template',
            label: 'Template',
            component: TemplateDoc,
        },
        {
            id: 'command',
            label: 'Command',
            component: CommandDoc,
        },
        {
            id: 'router',
            label: 'Router',
            component: RouterDoc,
        },

        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
