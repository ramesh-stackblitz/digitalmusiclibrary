import { Component, ViewEncapsulation, OnInit, OnChanges } from '@angular/core';
import { BroadCastService } from './broad-cast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public user = '';
  title = 'digitalMusicLibrary';
  constructor(private broadCast: BroadCastService) {
  }
  ngOnInit() {
    this.broadCast.getUser().subscribe((data) => {
      this.user = data.user;
   });
  }
  logOut() {
     this.user = '';
  }
}
