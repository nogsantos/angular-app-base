import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services';

const CORE_PROVIDERS = [
    AuthGuardService
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        // NbAuthModule,
    ],
    declarations: [],
    providers: [
        ...CORE_PROVIDERS
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        // throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }

    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: CoreModule,
            providers: [
                ...CORE_PROVIDERS,
            ],
        };
    }
}
