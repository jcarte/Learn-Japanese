import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

// https://github.com/angular/angularfire2/tree/master/docs

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.items = this.db.list('/Chapters');
  }
  items: FirebaseListObservable<any[]>;
  constructor(private db:AngularFireDatabase){
    
  }
  title = 'Learn Japanese';
}
