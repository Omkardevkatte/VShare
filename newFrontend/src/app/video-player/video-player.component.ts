import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VgPlayerComponent } from '@videogular/ngx-videogular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [VgCoreModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})




export class VideoPlayerComponent {

}
