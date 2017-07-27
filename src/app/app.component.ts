import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

// https://github.com/angular/angularfire2/tree/master/docs

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <chapter-list></chapter-list>`,
  styles: ['']
})
export class AppComponent{
  title = 'Learn Japanese';
}
