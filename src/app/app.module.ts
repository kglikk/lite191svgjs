import { GetBusNoService } from './services/getbusno';

import { ShowDataService } from './services/show-data.service';
import { CallbackComponent } from './callback/callback.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { ProjectService } from 'app/services/project.service';
import { HttpClientModule } from '@angular/common/http';

import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';



/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing'
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

// Core providers
import {CoreModule} from "./core/core.module";
import {SmartadminLayoutModule} from "./shared/layout/layout.module";

import { ModalModule } from 'ngx-bootstrap/modal';
import { LineTypeService } from './services/linetype.service';
import { SvgAreaService } from './services/svgarea.service';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CallbackComponent
   
    
  

  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    
    HttpClientModule,

    ModalModule.forRoot(),


    CoreModule,
    SmartadminLayoutModule,
    
    

    routing
  ],
  exports: [
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    AuthService,
    AuthGuard,
    ProjectService,
    ShowDataService, 
    LineTypeService,
    SvgAreaService,
    GetBusNoService,
    // ENV_PROVIDERS,
    APP_PROVIDERS,
 
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}


}

