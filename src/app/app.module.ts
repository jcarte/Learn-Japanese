import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { PractiseComponent } from './practise.component';
import { ChaptersComponent } from './chapters.component';
import { DataService } from './data.service';
import { AppRoutingModule } from './app-routing.module';




@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ChaptersComponent,
    PractiseComponent
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
