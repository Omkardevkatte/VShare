import { Component, NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';


export const routes: Routes = [
    {
        path: 'upload-video', component: UploadVideoComponent,
    },

    {
        path: 'save-video-details/:id', component: SaveVideoDetailsComponent
    }
   
];




