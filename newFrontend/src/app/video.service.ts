import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { UploadVideoResponse } from './upload-video/UploadVideoResponse';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) { 
   }
  
   uploadVideo(file: File): Observable<UploadVideoResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name); // Append the file with its name

    return this.httpClient.post<UploadVideoResponse>("http://localhost:8080/api/videos/upload", formData);
  }

  uploadThumbnail(fileEntry:File, videoId:string): Observable<string> {
    const formData = new FormData();
    formData.append('file', fileEntry,fileEntry.name);
    formData.append('VideoId', videoId) // Append the file with its name
    // formData.append('videoId', videoId);

    return this.httpClient.post("http://localhost:8080/api/videos/thumbnail", formData,{
    responseType:'text'
    });
  }
}
