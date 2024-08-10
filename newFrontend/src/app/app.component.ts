import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common'; 
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import{MatIconModule} from '@angular/material/icon'
import{FlexLayoutModule} from '@angular/flex-layout';
import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';
import{MatChipsModule} from '@angular/material/chips';
import { MatChipInput } from '@angular/material/chips';
// import { SaveVideoDetailsComponent } from './save-video-details/save-video-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgxFileDropModule,CommonModule, UploadVideoComponent,HeaderComponent,MatToolbarModule,MatIconModule,FlexLayoutModule,SaveVideoDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ytclone';
}
