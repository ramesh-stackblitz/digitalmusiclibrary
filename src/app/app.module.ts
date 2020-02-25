import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {AlbumlistService} from './albumlist/albumlist.service';
import { AppComponent } from './app.component';
import { AlbumlistComponent } from './albumlist/albumlist.component';
import { AdminComponent } from './admin/admin.component';
import { TableFilterPipe } from './pipe/table-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlbumlistComponent,
    AdminComponent,
    TableFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFontAwesomeModule
  ],
  providers: [AlbumlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
