import {Component,OnInit} from '@angular/core';
import {DataService} from './data.service';
import {Chapter} from './chapter';


    // <li *ngFor="let chapter of chapters"  [routerLink]="['/practise', chapter.chapterId]">
    //   {{chapter.description}} ({{chapter.chapterId}})
    // </li>

@Component({
  selector: 'chapter-list',
  template: `    

<div class="list-group col-xs-6 col-xs-offset-3">
  <a *ngFor="let chapter of chapters" [routerLink]="['/practise', chapter.chapterId]" class="list-group-item text-center">
  {{chapter.description}}</a>
</div>

`,
  styles: ['']
})
export class ChaptersComponent implements OnInit{
    chapters: Chapter[];
    ngOnInit(): void {
        this.dataService.getChapters().then(chapters => this.chapters = chapters);
    }
    constructor(private dataService: DataService) { }
}