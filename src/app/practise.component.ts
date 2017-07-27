import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { DataService } from './data.service';
import { Keyword } from './keyword';
import { Chapter } from './chapter';


import 'rxjs/add/operator/switchMap';//??????

@Component({
    selector: 'practise',
    template: `    
    <li *ngFor="let keyword of keywords">
      {{keyword.keywordId}} {{keyword.chapterId}} {{keyword.english}} {{keyword.hiragana}} {{keyword.romaji}} {{keyword.kanji}}
    </li>`,
    styles: [ '' ]
})

export class PractiseComponent implements OnInit {
    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
            this.dataService.getChapter(+params.get('chapterId'))).subscribe(chapter => 
                this.dataService.getKeywords(chapter.chapterId).then(keywords => this.keywords = keywords));
    }
    constructor(
        private dataService: DataService,
        private route: ActivatedRoute,
        private location: Location) { }

    // goBack(): void {
    //     this.location.back();
    // }

    keywords: Keyword[];
}