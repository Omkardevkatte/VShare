import { Component } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule, formatDate } from '@angular/common'; 
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoService } from '../video.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon'
// import { Router } from 'express';
import { Router } from '@angular/router';
import { UploadVideoResponse } from './UploadVideoResponse';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({

  selector: 'app-upload-video',
  standalone:true,
  imports: [NgxFileDropModule,CommonModule,MatToolbarModule,MatIconModule],
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent  {

  

  public files: NgxFileDropEntry[] = [];

  fileuploaded:boolean = false;
  fileEntry:FileSystemFileEntry | undefined
  fileUploadedSuccessfully: boolean = false;

  constructor(private videoServices:VideoService, private router: Router, private matSnackbar:MatSnackBar){

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          this.fileuploaded = true;
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event:any){
    console.log(event);
  }

  public fileLeave(event:any){
    console.log(event);
  }

  
  uploadVideo(){
    //Upload Video To Backend
    if(this.fileEntry !==undefined){

      this.fileEntry.file(file =>{

        
        this.videoServices.uploadVideo(file).subscribe((response: UploadVideoResponse) =>{

          console.log("Video Id"+ response.id + "Video Url" + response.videoUrl);
          this.router.navigateByUrl(`save-video-details/${response.id}`);

          
        });
      })

     
    }
  }
}