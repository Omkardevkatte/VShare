import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClient,HttpHandler } from '@angular/common/http';
import { routes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import {NgModule} from '@angular/core';
import { VgPlayerComponent } from '@videogular/ngx-videogular/core';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideHttpClient(),provideClientHydration(), provideAnimationsAsync('noop'), provideAnimationsAsync('noop'), provideAnimationsAsync('noop'), provideAnimationsAsync(), BrowserModule,VgCoreModule,
    VgControlsModule,
    VgPlayerComponent,
    VgOverlayPlayModule,
    VgBufferingModule,
    MatSnackBar,CommonModule,
    FlexLayoutServerModule]
};
