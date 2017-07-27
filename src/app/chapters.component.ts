import {Component,OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Chapter} from './chapter';


@Component({
  selector: 'chapter-list',
  template: `    
    <li *ngFor="let chapter of chapters"  [routerLink]="['/practise', chapter.chapterId]">
      {{chapter.description}} ({{chapter.chapterId}})
    </li>`,
  styles: ['']
})
export class ChaptersComponent implements OnInit{
    chapters: Chapter[];
    ngOnInit(): void {
        this.dataService.getChapters().then(chapters => this.chapters = chapters);
    }
    constructor(private dataService: DataService) { }
}