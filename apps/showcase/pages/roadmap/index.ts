import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <div class="doc-intro">
                <h1>Roadmap</h1>
                <p>
                    At <a href="https://www.primetek.com.tr/" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">PrimeTek</a>, we are passionate about improving PrimeNG and would like to share our ideas for
                    2025 with the community. These are planned to be implemented in parallel to the regular maintenance work of the library involving review of issue tickets, PRs, LTS updates and PrimeNG PRO support.
                </p>
            </div>

            <div class="overflow-auto">
                <div style="min-width: 1200px">
                    <div class="flex gap-4 mb-4">
                        <div class="shrink-0 w-56"></div>
                        <div class="flex-1 bg-gray-500 text-white font-bold text-center p-4 text-xl rounded">Q1</div>
                        <div class="flex-1 bg-gray-500 text-white font-bold text-center p-4 text-xl rounded">Q2</div>
                        <div class="flex-1 bg-gray-500 text-white font-bold text-center p-4 text-xl rounded">Q3</div>
                        <div class="flex-1 bg-gray-500 text-white font-bold text-center p-4 text-xl rounded">Q4</div>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex gap-4 border-b border-surface-200 dark:border-surface-700 pb-4">
                            <div class="shrink-0 p-4 bg-blue-500 text-white rounded font-bold text-lg flex items-center justify-center w-56">COMPONENTS</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4 ">
                                    <h2 class="text-lg font-bold mt-0 mb-2">New Theme Editor</h2>
                                    <p class="mt-0 mb-4 leading-normal">Advanced visual theme designer with support for the entire design token set, Figma to code and cloud storage.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">&#64;primeuix/themes</h2>
                                    <p class="mt-0 mb-4 leading-normal">Migrate to the new theming package that is shared between all Prime UI libraries.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Form Enhancements</h2>
                                    <p class="mt-0 mb-4 leading-normal">First class support for template-driven and reactive forms.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">PrimeNG v20</h2>
                                    <p class="mt-0 mb-4 leading-normal">Release of v20 after Angular v20 release featuring primeuix migration.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Remastered Components - Phase I</h2>
                                    <p class="mt-0 mb-4 leading-normal">Initiate internal modernization of components to utilize the modern Angular APIs featuring new test suite, pass-through attributes, signals, control flow, zoneless and more.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Remastered Components - Phase II</h2>
                                    <p class="mt-0 mb-4 leading-normal">Continue internal modernization of components.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-blue-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">PrimeNG v21</h2>
                                    <p class="mt-0 mb-4 leading-normal">Angular v21 compatible version.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-blue-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-indigo-500 text-white rounded font-bold text-lg flex items-center justify-center w-56">FIGMA UI Kit</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-indigo-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Updates to Sync PrimeNG Design Tokens</h2>
                                    <p class="mt-0 mb-4 leading-normal">Continuous updates to sync the design tokens in Figma with the theme code.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded invisible">
                                        <div class="bg-indigo-500 rounded" style="width: 20%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-violet-500 text-white rounded font-bold text-lg flex items-center justify-center w-56">TEMPLATES</div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-violet-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Updates to v19+</h2>
                                    <p class="mt-0 mb-4 leading-normal">Migrate to v19+, ngmodule to standalone, and Primeflex to Tailwind.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-violet-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-violet-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Diamond Remaster</h2>
                                    <p class="mt-0 mb-4 leading-normal">Redesigned version of Diamond with an entirely new design.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-violet-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-violet-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Poseidon Remaster</h2>
                                    <p class="mt-0 mb-4 leading-normal">Remastered version of Poseidon with a brand new design.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-violet-500 rounded" style="width: 100%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-violet-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Template Updates</h2>
                                    <p class="mt-0 mb-4 leading-normal">Update all templates to Angular and PrimeNG v20.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-violet-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-violet-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Avalon Remaster</h2>
                                    <p class="mt-0 mb-4 leading-normal">Redesigned version of Avalon with a fresh look and feel.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-violet-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                        <div class="flex gap-4 border-b border-surface pb-4">
                            <div class="shrink-0 p-4 bg-orange-500 text-white rounded font-bold text-lg flex items-center justify-center w-56">PRIMEBLOCKS</div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                            <div class="flex-1 flex gap-4 flex-col">
                                <div class="p-4 bg-surface-0 dark:bg-surface-900 rounded border-orange-500 border-l-4">
                                    <h2 class="text-lg font-bold mt-0 mb-2">Next-Gen PrimeBlocks</h2>
                                    <p class="mt-0 mb-4 leading-normal">Tailwind CSS blocks at <a href="https://primeblocks.org" target="_blank" rel="noopener noreferrer" class="text-primary font-medium hover:underline">PrimeBlocks</a>.</p>
                                    <div class="bg-surface-200 dark:bg-surface-600 rounded">
                                        <div class="bg-orange-500 rounded" style="width: 0%; height: 4px"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 flex gap-4 flex-col"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class RoadmapDemo {
    constructor(
        private titleService: Title,
        private metaService: Meta
    ) {
        this.titleService.setTitle('Roadmap - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Roadmap' });
    }
}
