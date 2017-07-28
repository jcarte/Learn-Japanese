import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

// https://github.com/angular/angularfire2/tree/master/docs

//https://bootswatch.com/superhero/


@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" [routerLink]="['/']">{{title}}</a>
        </div>
      </div>
    </nav>
    <router-outlet></router-outlet>`,
  styles: ['']
})
export class AppComponent{
  title = 'Genki Japanese';
}
