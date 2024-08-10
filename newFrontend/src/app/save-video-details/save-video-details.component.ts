import { Component,OnInit, signal } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import{FlexLayoutModule} from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import{MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup } from '@angular/forms';
import { title } from 'process';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import{MatChipsModule} from '@angular/material/chips';
import { MatChipInput } from '@angular/material/chips';
import { MatChip } from '@angular/material/chips';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {ChangeDetectionStrategy, inject} from '@angular/core';
// import { UploadVideoResponse } from '../upload-video/UploadVideoResponse';
import { Observable } from 'rxjs';
import { HttpClient,HttpHandler } from '@angular/common/http';
import { VideoService } from '../video.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ok } from 'assert';
import { CommonModule } from '@angular/common';
// import { Route } from '@angular/router';
// import { FlexLayoutModu } from '@angular/flex-layout';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-save-video-details',
  standalone: true,
  imports: [RouterOutlet,MatChipInput,FlexLayoutServerModule,MatChip,MatChipsModule,MatToolbarModule,ReactiveFormsModule,MatIconModule,MatCommonModule,MatInputModule, MatFormFieldModule,MatSelectModule,MatButtonModule,CommonModule],
  templateUrl: './save-video-details.component.html',
  styleUrl: './save-video-details.component.css'
})

 export class SaveVideoDetailsComponent implements OnInit{

  saveVidoeDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  selectedFile!: File;
  selectedFileName = '';
  VideoId = '';

  fileSelected=  false;
  

  constructor(private activatedRoute: ActivatedRoute,private videoservice:VideoService, private httpclient:HttpClient, private matSnackbar: MatSnackBar){

    // this.VideoId = this.activatedRoute.snapshot.params['id'];
   
    this.activatedRoute.params.subscribe(params => {
      this.VideoId = params['id'];
    });

    this.saveVidoeDetailsForm = new FormGroup({
      title: this.title,
     description: this.description,
    videoStatus: this.videoStatus,

    })
  }
  
  ngOnInit(): void {

  }
 
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Fruit[]>([]);
  readonly announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update(fruits => [...fruits, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    this.tags.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index < 0) {
        return fruits;
      }

      fruits.splice(index, 1);
      this.announcer.announce(`Removed ${fruit.name}`);
      return [...fruits];
    });
  }

  edit(fruit: Fruit, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    this.tags.update(fruits => {
      const index = fruits.indexOf(fruit);
      if (index >= 0) {
        fruits[index].name = value;
        return [...fruits];
      }
      return fruits;
    });

    
  }

  onfileSelected(event: Event){
    const inputElement = (event.target as HTMLInputElement)?.files?.[0];
    if (inputElement) {
      this.selectedFile = inputElement;
      this.selectedFileName = this.selectedFile.name;
      this.fileSelected=true;
    }
  }
  onUpload(){
    this.videoservice.uploadThumbnail(this.selectedFile, this.VideoId).subscribe(data =>{
      console.log(data);
      //Show Upload sucessfull messege
      this.matSnackbar.open("Thumbnail Upload Successfull!", "OK");
    })
  }


}