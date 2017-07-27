import {Component,OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Chapter} from './chapter';


@Component({
  selector: 'chapter-list',
  template: `    
    <li *ngFor="let chapter of chapters">
      {{chapter.description}} ({{chapter.chapterId}})
    </li>`,
  styles: ['']
})
export class ChaptersComponent implements OnInit{
    chapters: Chapter[];
    ngOnInit(): void {
        this.chapters = this.dataService.getChapters();
    }
    constructor(private dataService: DataService) { }
}